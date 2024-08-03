// Button.tsx
import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
