// pages/AddProduct.tsx
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import styles from "./AddProduct.module.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
// import { storage } from "../firebaseConfig";

const AddProduct: React.FC = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    desc: "",
    image: "none",
    styleType: "text",
  });
  const [file, setFile] = useState<File | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (selectedFile) {
        const imageRef = ref(storage, `images/${selectedFile.name}`);
        try {
          await uploadBytes(imageRef, selectedFile);
          const url = await getDownloadURL(imageRef);

          // Обновляем форму с URL загруженного изображения
          setFormValue((prevState) => ({
            ...prevState,
            image: url, // Устанавливаем URL как значение поля
          }));
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.desc.trim() ||
      !formValue.styleType.trim()
    ) {
      alert("Заполните все поля!");
      return;
    }

    dispatch(addProduct(formValue));

    setFormValue({
      title: "",
      desc: "",
      image: "none",
      styleType: "text",
    });
    setFile(null);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValue.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          id="desc"
          name="desc"
          value={formValue.desc}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="fileUpload">Upload Image</label>
        <input type="file" id="fileUpload" onChange={handleFileChange} />
      </div>

      <div>
        <label htmlFor="styleType">Style Type</label>
        <select
          id="styleType"
          name="styleType"
          value={formValue.styleType}
          onChange={handleChange}
        >
          <option value="text">text </option>
          <option value="text-picture">text-picture</option>
          <option value="text-bgImage">text-bgImage</option>{" "}
          <option value="picture-text">picture-text</option>{" "}
          <option value="text-btn">text-btn</option>
        </select>
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
