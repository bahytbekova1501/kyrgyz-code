"use client";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./portfolio.module.css";
import { useDispatch } from "react-redux";
import PortfolioCard from "./PortfolioCard";
import { fetchPortfolioCard } from "@/redux/slices/portfolioCardSlice";
import Link from "next/link";

interface PortfolioCardListProps {
  portfolioId: number;
}
const PortfolioCardList: React.FC<PortfolioCardListProps> = ({
  portfolioId,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const portfolioCards = useSelector((state: RootState) => state.card.card);
  const loading = useSelector((state: RootState) => state.card.loading);
  const error = useSelector((state: RootState) => state.card.error);
  const isAdmin = useSelector((state: RootState) => state.admin.isAdmin);
  useEffect(() => {
    dispatch(fetchPortfolioCard());
  }, [dispatch]);
  console.log("Portfolio data:", portfolioCards);
  const filteredCards = portfolioCards.filter(
    (card) => card.portfolio === portfolioId
  );
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className={styles.list_container}>
        {Array.isArray(filteredCards) && filteredCards.length > 0 ? (
          filteredCards.map((card) => {
            return <PortfolioCard key={card.id} item={card} />;
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
      {isAdmin ? (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Link href="/products/addPortfolio">
            <button className={styles.addProduct_btn}> Добавить </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PortfolioCardList;
