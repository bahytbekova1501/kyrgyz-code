// pages/AddProduct.tsx
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addPortfolio } from "@/redux/slices/portfolioSlice";
import { useSelector } from "react-redux";
import { PortfolioProductForm } from "@/types/card.types";

const AddPortfolio: React.FC = () => {
  const [formValue, setFormValue] = useState<PortfolioProductForm>({
    title: "",
    days: "",
    company: "",
    card: [],
  });

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.days.trim() ||
      !formValue.company.trim()
    ) {
      alert("Заполните все поля!");
      return;
    }

    // dispatch(addPortfolio(formValue));
    dispatch(addPortfolio(formValue));
    setFormValue({
      title: "",
      days: "",
      company: "",
      card: [],
    });
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
      <button type="submit">Add Portfolio</button>
    </form>
  );
};

export default AddPortfolio;
