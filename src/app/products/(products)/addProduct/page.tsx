// pages/AddProduct.tsx
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import styles from "./AddProduct.module.css";

import api from "@/api/api";

const AddProduct: React.FC = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    desc: "",
    image: null as File | null,
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormValue({
        ...formValue,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.desc.trim() ||
      !formValue.styleType.trim() ||
      !formValue.image
    ) {
      alert("Заполните все поля!");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("title", formValue.title);
    formData.append("desc", formValue.desc);
    formData.append("styleType", formValue.styleType);
    formData.append("image", formValue.image);

    try {
      await dispatch(addProduct({ formData })).unwrap();
      setFormValue({
        title: "",
        desc: "",
        image: null,
        styleType: "text",
      });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
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
