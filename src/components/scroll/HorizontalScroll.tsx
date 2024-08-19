import React from "react";
import styles from "./HorizontalScroll.module.css";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  return <div className={styles.horizontalScrollContainer}>{children}</div>;
};

export default HorizontalScroll;
