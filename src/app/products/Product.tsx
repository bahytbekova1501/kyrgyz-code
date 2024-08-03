// components/Product.tsx
import React from "react";
import styles from "./product.module.css";
import { CardTypes } from "@/types/card.types";
import btnlogo from "../../img/btn_logo.svg";
import Image from "next/image";
import num from "../../img/120.svg";
import num3 from "../../img/3.svg";
interface ProductProps {
  product: CardTypes;
  onDelete: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ product, onDelete }) => {
  const { title, desc, image, styleType } = product;
  const cardStyle = `${styles.card} ${styles[styleType] || ""}`;
  const contentStyle = `${styles.card_content} ${
    styleType === "text" ? styles.text : ""
  }`;
  return (
    <div className={cardStyle}>
      {styleType === "text-bgImage" && image && image !== "none" && (
        <div
          className={styles.card_background}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      )}{" "}
      <div className={contentStyle}>
        {styleType === "text-bgImage" && image && image !== "none" && (
          <Image
            src={num3}
            alt="Product"
            style={{ width: "5vw", height: "5vw" }}
          />
        )}
        {styleType === "picture-text" && image && image !== "none" && (
          <img
            src={image}
            alt="Product"
            style={{ width: "11vw", height: "7vw" }}
          />
        )}{" "}
        {styleType === "text" && (
          <>
            <p style={{ fontSize: "1.2vw", fontWeight: "500" }}>Более</p>
            <Image
              src={num}
              alt="Product"
              style={{ width: "10vw", height: "6vw" }}
            />
          </>
        )}
        <h2>{title}</h2>
        {/* <p>{desc}</p> */}
        {styleType === "text-picture" && image && image !== "none" && (
          <img
            src={image}
            alt="Product"
            style={{ width: "8vw", height: "2.8vw" }}
          />
        )}{" "}
        {styleType === "text-btn" && (
          <button>
            {" "}
            <Image className={styles.btnlogo} src={btnlogo} alt="" /> Посмотреть
          </button>
        )}
      </div>
      {styleType === "text-bgImage" && <div className={styles.overlay} />}
      {/* Uncomment if delete button is needed */}
      {/* <button onClick={() => onDelete(product.id)}>Delete</button> */}
    </div>
  );
};

export default Product;
