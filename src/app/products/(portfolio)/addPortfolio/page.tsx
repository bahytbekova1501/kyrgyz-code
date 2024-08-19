// pages/AddProduct.tsx
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
// import { addPortfolio } from "@/redux/slices/portfolioSlice";
import { useSelector } from "react-redux";
import { PortfolioProductForm } from "@/types/card.types";
import { addPortfolio } from "@/redux/slices/portfolioSlice";

const AddPortfolio: React.FC = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    days: "",
    company: "",
    blgimage: null as File | null,
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
        blgimage: e.target.files[0],
      });
    }
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   setFormValue({
  //     ...formValue,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormValue({
  //       ...formValue,
  //       blgimage: e.target.files[0],
  //     });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.days.trim() ||
      !formValue.company.trim() ||
      !formValue.blgimage
    ) {
      alert("Заполните все поля!");
      return;
    }
    const formData = new FormData();
    formData.append("title", formValue.title);
    formData.append("days", formValue.days);
    formData.append("company", formValue.company);
    formData.append("blgimage", formValue.blgimage);

    try {
      // Передайте объект с `formData`, если это требуется в `addPortfolio`
      await dispatch(addPortfolio({ formData })).unwrap();
      setFormValue({
        title: "",
        days: "",
        company: "",
        blgimage: null,
      });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div>
      <div>dlkjfnvdfjnkn</div>
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
          <label htmlFor="desc">days</label>
          <input
            type="text"
            id="days"
            name="days"
            value={formValue.days}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="desc">company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formValue.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fileUpload">Upload Image</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
        </div>

        <button type="submit">Add Portfolio</button>
      </form>{" "}
    </div>
  );
};

export default AddPortfolio;
