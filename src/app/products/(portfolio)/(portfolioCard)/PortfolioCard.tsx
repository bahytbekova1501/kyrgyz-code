// components/Product.tsx
import React, { useState } from "react";
import styles from "./portfolio.module.css";
import { PortfolioCardTypes } from "@/types/card.types";
interface CardProps {
  item: PortfolioCardTypes;
}

const PortfolioCard: React.FC<CardProps> = ({ item }) => {
  return (
    <div>
      {" "}
      <h3>{item.title}</h3>
    </div>
  );
};

export default PortfolioCard;
