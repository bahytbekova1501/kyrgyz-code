// Button.tsx
import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";

type ButtonProps = {
  label: string;
  onClick?: () => void; // onClick теперь необязателен
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  color?: string;
  href?: string; // Добавляем пропс для ссылки
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type = "button",
  color = "defaultColor",
}) => {
  const buttonStyle = { backgroundColor: color };

  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={buttonStyle}
    >
      {label}
    </button>
  );
};

export default Button;
