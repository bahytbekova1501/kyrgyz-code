// components/Product.tsx
import React, { useState } from "react";
import styles from "./portfolio.module.css";
import { PortfolioProductTypes } from "@/types/card.types";
import downLogo from "../../../img/down.svg";
import Image from "next/image";
import PortfolioCard from "./(portfolioCard)/PortfolioCard";
import PortfolioList from "./PortfolioList";
import PortfolioCardList from "./(portfolioCard)/PortfolioCardList";
import ProductList from "../(products)/ProductsList";
interface ProductProps {
  item: PortfolioProductTypes;
  index: number;
  //   onDelete: (id: number) => void;
  expandedId: number | null;
  onToggle: (id: number) => void;
}

const PortfolioProduct: React.FC<ProductProps> = ({
  item,
  index,
  expandedId,
  onToggle,
}) => {
  const currentPortfolioId = item.id;
  const isExpanded = expandedId === item.id;

  return (
    <div>
      <div className={styles.list}>
        <div className={styles.mobile_block}>
          <div className={styles.mobile_ver}>
            <div className={styles.num_2}>
              {index < 10 ? `0${index + 1}` : index + 1}
            </div>
            <Image
              className={`${styles.toggleImage_2} ${
                isExpanded ? styles.expanded : ""
              }`}
              src={downLogo}
              alt=""
              onClick={() => onToggle(item.id)}
            />
          </div>
        </div>
        <div className={styles.num}>
          {index < 10 ? `0${index + 1}` : index + 1}
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.info_2}>
            <p className={styles.company}>{item.company}</p>
            <div>
              <p className={styles.time}>{item.days} days</p>
            </div>
          </div>
        </div>
        <Image
          className={`${styles.toggleImage} ${
            isExpanded ? styles.expanded : ""
          }`}
          src={downLogo}
          alt=""
          onClick={() => onToggle(item.id)}
        />
      </div>
      <div
        className={`${styles.additionalInfo} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        <PortfolioCardList portfolioId={currentPortfolioId} />
      </div>
      <div className={styles.bottomLine}></div>
    </div>
  );
};

export default PortfolioProduct;
