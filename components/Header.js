import Link from "next/link";
import React from "react";
import styles from "@/styles/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Helps Home</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/helps">
              <a>Helps</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
