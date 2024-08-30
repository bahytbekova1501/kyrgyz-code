// components/Product.tsx
import React, { useState } from "react";
import styles from "./portfolio.module.css";
import { PortfolioCardTypes } from "@/types/card.types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import del from "../../../../img/delete.png";
interface CardProps {
  item: PortfolioCardTypes;
  // onDelete: (id: number) => void;
}

const PortfolioCard: React.FC<CardProps> = ({
  item,
  //  onDelete
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(true);
  // const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const { title, link, image, btnImg, styleType, portfolio } = item;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    if (isConfirming) {
      // onDelete(product.id);
      closeModal();
    } else {
      setIsConfirming(true);
    }
  };

  const cardStyle = `${styles.card} ${styles[styleType]}`;
  // const contentStyle = `${styles.card_content} ${
  //   styleType === "text" ? styles.text : ""
  // }`;

  return (
    <div className={cardStyle}>
      {styleType === "bgImage" && image && image !== "none" && (
        <div
          className={styles.card_background}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      <div className={styles.card_content}>
        {styleType === "picture-text" && image && image !== "none" && (
          <img src={image} alt="Product" />
        )}{" "}
        <h3>{title}</h3>{" "}
        {styleType === "text" && (
          <>
            <p>
              – Design
              <br />
              – Development
              <br />– SEO <br />– Service
            </p>
          </>
        )}
        {styleType === "text-btn" && (
          <>
            <button className={styles.text_button}>
              <img
                src={btnImg}
                alt="Product"
                style={{
                  width:
                    title === "Через сайт пожертвовали уже больше $120 000"
                      ? "28px"
                      : "24px",
                  height:
                    title === "Через сайт пожертвовали уже больше $120 000"
                      ? "19px"
                      : "24px",
                  margin: "0 5px 0 0",
                }}
              />
              Ссылка на сайт
            </button>
          </>
        )}
      </div>
      {styleType === "bgImage" && <div className={styles.overlay} />}
      {/* Uncomment if delete button is needed */}
      {isAdmin && (
        <button onClick={openModal} className={styles.admin_btn}>
          <Image className={styles.delete_icon} src={del} alt="" />
        </button>
      )}
    </div>
  );
};

export default PortfolioCard;
