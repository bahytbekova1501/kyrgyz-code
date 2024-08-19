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
        {" "}
        <div className={styles.mobile_block}>
          <div className={styles.mobile_ver}>
            <div className={styles.num_2}>
              {index < 10 ? `0${index + 1}` : index + 1}{" "}
            </div>{" "}
            <Image
              className={styles.toggleImage_2}
              src={downLogo}
              alt=""
              onClick={() => handleToggle(item.id)}
            />
          </div>
        </div>
        <div className={styles.num}>
          {index < 10 ? `0${index + 1}` : index + 1}{" "}
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{item.title}</h2>{" "}
          <div className={styles.info_2}>
            <p className={styles.company}>{item.company}</p>
            <div>
              <p className={styles.time}>{item.days} days</p>
            </div>
          </div>
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
      <div className={styles.bottomLine}></div>
    </div>
  );
};

export default PortfolioProduct;
