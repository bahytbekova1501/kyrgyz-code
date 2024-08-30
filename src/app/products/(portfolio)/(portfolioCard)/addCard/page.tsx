"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPortfolio } from "@/redux/slices/portfolioSlice";
import { PortfolioCardTypes } from "@/types/card.types";

const AddCard: React.FC = () => {
  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="portfolio">Выберите продукт</label>
          <select
            id="portfolio"
            name="portfolio"
            onChange={handlePortfolioChange}
            value={portfolioId ?? ""}
          >
            <option value="">--Выберите продукт--</option>
            {portfolios.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="title">Название карточки</label>
          <input
            type="text"
            id="title"
            name="title"
            value={card.title}
            onChange={handleCardChange}
          />
        </div>
        <div>
          <label htmlFor="link">ccылка на кнопку</label>
          <input
            type="link"
            id="link"
            name="link"
            value={card.link}
            onChange={handleCardChange}
          />
        </div>
        <div>
          <label htmlFor="fileUpload">Upload Image</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="fileUpload">Upload BtnImage</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
        </div>

        <div>
          <label htmlFor="styleType">Тип стиля</label>
          <select
            id="styleType"
            name="styleType"
            value={card.styleType}
            onChange={handleCardChange}
          >
            <option value="text">Text</option>
            <option value="bgImage">bgImage</option>
            <option value="picture-text">picture-text</option>
            <option value="text-btn">text-btn</option>
          </select>
        </div>
        <button type="submit">Добавить карточку</button>
      </form>{" "} */}
    </div>
  );
};

export default AddCard;
