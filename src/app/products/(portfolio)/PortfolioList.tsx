"use client";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./portfolio.module.css";
import { useDispatch } from "react-redux";
import { fetchPortfolio } from "@/redux/slices/portfolioSlice";
import PortfolioProduct from "./PortfolioProduct";
import Link from "next/link";

const PortfolioList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const portfolio = useSelector(
    (state: RootState) => state.portfolio.portfolio
  );
  const loading = useSelector((state: RootState) => state.portfolio.loading);
  const error = useSelector((state: RootState) => state.portfolio.error);
  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);
  // console.log("Portfolio data:", portfolio);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      {loading && (
        <p style={{ color: "white", fontSize: "22px" }}>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
      <div className={styles.list_container}>
        {portfolio.map((product, index) => {
          return (
            <PortfolioProduct
              key={product.id}
              item={product}
              index={index}
              expandedId={expandedId}
              onToggle={handleToggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioList;
