import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...rest
}) => {
  const variantClass =
    variant === "secondary"
      ? styles.secondary
      : variant === "ghost"
      ? styles.ghost
      : styles.primary;

  return (
    <button
      className={`${styles.reset} ${styles.base} ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
