// components/Product.tsx
import React, { useState } from "react";
import styles from "./portfolio.module.css";
import { PortfolioProductTypes } from "@/types/card.types";
import downLogo from "../../../img/down.svg";
import Image from "next/image";
interface ProductProps {
  item: PortfolioProductTypes;
  index: number;
  //   onDelete: (id: number) => void;
}

const PortfolioProduct: React.FC<ProductProps> = ({ item, index }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return (
    <div>
      <div className={styles.list}>
        <div className={styles.num}>
          {index < 10 ? `0${index + 1}` : index + 1}{" "}
        </div>
        <h2 className={styles.title}>{item.title}</h2>{" "}
        <p className={styles.company}>{item.company}</p>
        <div>
          <p className={styles.time}>{item.days} days</p>
        </div>
        <Image
          className={styles.toggleImage}
          src={downLogo}
          alt=""
          onClick={() => handleToggle(item.id)}
        />
      </div>
      <div
        className={`${styles.additionalInfo} ${
          expandedId === item.id ? styles.expanded : ""
        }`}
      >
        <p> card</p>
      </div>
    </div>
  );
};

export default PortfolioProduct;
