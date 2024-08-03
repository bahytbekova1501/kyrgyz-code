"use client";
import { deleteProduct, fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Product from "./Product";
import styles from "./product.module.css";
import { StyleType } from "@/types/card.types";
import { useDispatch } from "react-redux";

const validStyleTypes: Set<StyleType> = new Set<StyleType>([
  "text",
  "text-picture",
  "text-bgImage",
  "picture-text",
  "text-btn",
]);

const getValidStyleType = (styleType: any): StyleType => {
  return validStyleTypes.has(styleType as StyleType)
    ? (styleType as StyleType)
    : "text";
};
const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className={styles.card_container}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => {
            const styleType: StyleType = getValidStyleType(product.styleType);
            return (
              <Product
                key={product.id}
                product={{ ...product, styleType }}
                onDelete={handleDelete}
              />
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
