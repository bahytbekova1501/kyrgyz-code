// "use client";
// import { AppDispatch, RootState } from "@/redux/store";
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import styles from "./portfolio.module.css";
// import { useDispatch } from "react-redux";
// import PortfolioCard from "./PortfolioCard";
// import { fetchPortfolioCard } from "@/redux/slices/portfolioCardSlice";
// import Link from "next/link";

// interface PortfolioCardListProps {
//   portfolioId: number;
// }
// const PortfolioCardList: React.FC<PortfolioCardListProps> = ({
//   portfolioId,
// }) => {
//   const dispatch: AppDispatch = useDispatch();
//   const portfolioCards = useSelector((state: RootState) => state.card.card);
//   const loading = useSelector((state: RootState) => state.card.loading);
//   const error = useSelector((state: RootState) => state.card.error);
//   const isAdmin = useSelector((state: RootState) => state.admin.isAdmin);
//   useEffect(() => {
//     dispatch(fetchPortfolioCard());
//   }, [dispatch]);
//   console.log("Portfolio data:", portfolioCards);
//   const filteredCards = portfolioCards.filter(
//     (card) => card.portfolio === portfolioId
//   );
//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       <div className={styles.card_container}>
//         {Array.isArray(filteredCards) && filteredCards.length > 0 ? (
//           filteredCards.map((card) => {
//             return <PortfolioCard key={card.id} item={card} />;
//           })
//         ) : (
//           <p>No products available</p>
//         )}
//       </div>
//       {isAdmin ? (
//         <div style={{ display: "flex", justifyContent: "end" }}>
//           <Link href="/products/addPortfolio">
//             <button className={styles.addProduct_btn}> Добавить </button>
//           </Link>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default PortfolioCardList;

"use client";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./portfolio.module.css";
import PortfolioCard from "./PortfolioCard";
import { fetchPortfolioCard } from "@/redux/slices/portfolioCardSlice";
import Link from "next/link";
import Slider from "react-slick";

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
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  useEffect(() => {
    dispatch(fetchPortfolioCard());
  }, [dispatch]);

  // console.log("Portfolio data:", portfolioCards);

  const filteredCards = portfolioCards.filter(
    (card) => card.portfolio === portfolioId
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: false, // Consider turning this off if it causes layout issues
    responsive: [
      { breakpoint: 1800, settings: { slidesToShow: 3 } },
      { breakpoint: 1340, settings: { slidesToShow: 2 } },
      { breakpoint: 1100, settings: { slidesToShow: 3 } },
      { breakpoint: 890, settings: { slidesToShow: 2 } },
      { breakpoint: 590, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {Array.isArray(filteredCards) && filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div key={card.id}>
                <PortfolioCard item={card} />
              </div>
            ))
          ) : (
            <p>Empty</p>
          )}
        </Slider>
      </div>
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Link href="/products/addPortfolio">
            <button className={styles.addProduct_btn}>Добавить</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PortfolioCardList;
