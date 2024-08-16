// "use client";
// import { AppDispatch, RootState } from "@/redux/store";
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import styles from "./portfolio.module.css";
// import { useDispatch } from "react-redux";
// import { fetchPortfolio } from "@/redux/slices/portfolioSlice";
// import PortfolioCard from "./PortfolioCard";

// const PortfolioCardList: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const portfolio = useSelector(
//     (state: RootState) => state.portfolio.portfolio
//   );
//   const loading = useSelector((state: RootState) => state.portfolio.loading);
//   const error = useSelector((state: RootState) => state.portfolio.error);

//   useEffect(() => {
//     dispatch(fetchPortfolio());
//   }, [dispatch]);
//   console.log("Portfolio data:", portfolio);
//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       <div className={styles.list_container}>
//         {Array.isArray(portfolio) && portfolio.length > 0 ? (
//           portfolio.map((product) => {
//             return <PortfolioCard key={product.id} item={product} />;
//           })
//         ) : (
//           <p>No products available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PortfolioCardList;
