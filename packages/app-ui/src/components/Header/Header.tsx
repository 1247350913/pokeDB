import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import { ASSETS } from "../../lib/assets";

export interface HeaderProps {
  showProfile?: boolean;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  showProfile = false,
  onProfileClick,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Link to="/">
          <img src={ASSETS.logo} alt="App logo" className={styles.logo} />
        </Link>
      </div>

      {showProfile && (
        <button
          className={styles.profileButton}
          onClick={onProfileClick}
          aria-label="Profile"
        >
          <img
            src="/assets/icons/profile.svg"
            alt="Profile"
            className={styles.profileIcon}
          />
        </button>
      )}
    </header>
  );
};