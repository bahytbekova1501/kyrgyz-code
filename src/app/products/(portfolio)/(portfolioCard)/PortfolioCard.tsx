// components/Product.tsx
import React, { useState } from "react";
import styles from "./portfolio.module.css";
import { PortfolioCardTypes } from "@/types/card.types";
interface CardProps {
  item: PortfolioCardTypes;
}

const PortfolioCard: React.FC<CardProps> = ({ item }) => {
  return <div>{item.title}</div>;
};

export default PortfolioCard;
