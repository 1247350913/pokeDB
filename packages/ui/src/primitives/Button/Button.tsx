import React from "react";
import "./Button.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`ui-button ui-button--${variant} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};