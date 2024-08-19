"use client";
import {
  deleteProduct,
  // deleteProduct,
  fetchProducts,
} from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Product from "./Product";
import styles from "./product.module.css";
import { StyleType } from "@/types/card.types";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import HorizontalScroll from "@/components/scroll/HorizontalScroll";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHorizontalScroll, setIsHorizontalScroll] = useState(true);

  const updateScrollState = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // Устанавливаем состояние прокрутки на горизонтальное, если не достигнут край контейнера
      setIsHorizontalScroll(
        scrollLeft > 0 && scrollLeft < scrollWidth - clientWidth
      );
    }
  };

  const handleWheel = (event: WheelEvent) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const delta = event.deltaY;

      if (isHorizontalScroll) {
        if (delta > 0) {
          // Прокрутка вправо
          if (scrollLeft + delta >= scrollWidth - clientWidth) {
            container.scrollLeft = scrollWidth - clientWidth; // Достигнут конец
            setIsHorizontalScroll(false); // Переключаемся на вертикальную прокрутку
          } else {
            container.scrollLeft += delta;
            event.preventDefault(); // Блокируем вертикальное прокручивание
          }
        } else {
          // Прокрутка влево
          if (scrollLeft + delta <= 0) {
            container.scrollLeft = 0; // Достигнуто начало
            setIsHorizontalScroll(false); // Переключаемся на вертикальную прокрутку
          } else {
            container.scrollLeft += delta;
            event.preventDefault(); // Блокируем вертикальное прокручивание
          }
        }
      }
    }
  };

  useEffect(() => {
    const handlePageScroll = (event: WheelEvent) => {
      if (!isHorizontalScroll) {
        // Разрешаем вертикальную прокрутку, если горизонтальная блокирована
        return;
      }
      event.preventDefault(); // Блокируем вертикальную прокрутку, пока активна горизонтальная
    };

    window.addEventListener("wheel", handlePageScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handlePageScroll);
    };
  }, [isHorizontalScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
      // Обновляем состояние прокрутки при изменении размеров контейнера
      const resizeObserver = new ResizeObserver(updateScrollState);
      resizeObserver.observe(container);
      return () => {
        container.removeEventListener("wheel", handleWheel);
        resizeObserver.disconnect();
      };
    }
  }, []);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };
  // const handleScroll = (event: React.WheelEvent) => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollLeft += event.deltaY;
  //   }
  // };
  return (
    <div>
      {" "}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div
        className={styles.card_container}
        // ref={scrollContainerRef}
        // onWheel={handleScroll}
        ref={containerRef}
      >
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
        )}{" "}
      </div>{" "}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Link href="/products/addProduct">
          <button className={styles.addProduct_btn}> Добавить </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
