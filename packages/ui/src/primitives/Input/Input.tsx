import React from "react";
import "./Input.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({
  className = "",
  ...rest
}) => {
  return <input className={`ui-input ${className}`} {...rest} />;
};