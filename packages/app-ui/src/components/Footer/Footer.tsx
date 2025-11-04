import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>NCC — No Copyright Code</span>
    </footer>
  );
};
