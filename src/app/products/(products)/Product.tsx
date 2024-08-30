// components/Product.tsx
import React, { useEffect, useState } from "react";
import styles from "./product.module.css";
import { CardTypes } from "@/types/card.types";
import btnlogo from "../../../img/btn_logo.svg";
import Image from "next/image";
import num from "../../../img/120.svg";
import num3 from "../../../img/3.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import del from "../../../img/delete.png";
import Modal from "@/components/modal/Modal";
interface ProductProps {
  product: CardTypes;
  onDelete: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ product, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(true);
  // const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const { title, desc, image, styleType } = product;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    if (isConfirming) {
      onDelete(product.id);
      closeModal();
    } else {
      setIsConfirming(true);
    }
  };

  const cardStyle = `${styles.card} ${styles[styleType] || ""}`;
  const contentStyle = `${styles.card_content} ${
    styleType === "text" ? styles.text : ""
  }`;

  return (
    <>
      <div className={cardStyle}>
        {styleType === "text-bgImage" && image && image !== "none" && (
          <div
            className={styles.card_background}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        )}{" "}
        <div className={contentStyle}>
          {styleType === "text-bgImage" && image && image !== "none" && (
            <Image
              src={num3}
              alt="Product"
              style={{ width: "65px", height: "72px" }}
            />
          )}
          {styleType === "picture-text" && image && image !== "none" && (
            <img
              src={image}
              alt="Product"
              style={{ width: "188px", height: "110px" }}
            />
          )}{" "}
          {styleType === "text" && (
            <>
              <p style={{ fontSize: "18px", fontWeight: "700" }}>Более</p>
              <Image
                src={num}
                alt="Product"
                style={{ width: "150px", height: "90px" }}
              />
            </>
          )}
          <h2>{title}</h2>
          {/* <p>{desc}</p> */}
          {styleType === "text-picture" && image && image !== "none" && (
            <img
              src={image}
              alt="Product"
              style={{ width: "125px", height: "40px" }}
            />
          )}{" "}
          {styleType === "text-btn" && (
            <button className={styles.text_button}>Посмотреть</button>
          )}
        </div>
        {styleType === "text-bgImage" && <div className={styles.overlay} />}
        {/* Uncomment if delete button is needed */}
        {isAdmin && (
          <button onClick={openModal} className={styles.admin_btn}>
            <Image className={styles.delete_icon} src={del} alt="" />
          </button>
        )}
      </div>{" "}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={styles.modalContent}>
          {isConfirming ? (
            <>
              <p>Вы уверены, что хотите удалить эту карточку?</p>
              <button onClick={handleDelete} className={styles.confirmButton}>
                Да
              </button>
              <button onClick={closeModal} className={styles.cancelButton}>
                Отмена
              </button>
            </>
          ) : (
            <>
              <p>Вы уверены, что хотите удалить эту карточку?</p>
              <button onClick={handleDelete} className={styles.confirmButton}>
                Да
              </button>
              <button
                onClick={() => setIsConfirming(false)}
                className={styles.cancelButton}
              >
                Отмена
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Product;
