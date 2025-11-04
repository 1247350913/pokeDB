import React from "react";
import styles from "./Input.module.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({
  className = "",
  ...rest
}) => {
  return (
    <input
      className={`${styles.reset} ${styles.base} ${className}`}
      {...rest}
    />
  );
};
