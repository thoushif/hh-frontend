import Link from "next/link";
import React from "react";
import styles from "@/styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Help Helper! 2022 </p>
      <p>
        <Link href="/about">About this project</Link>
      </p>
    </footer>
  );
}

export default Footer;
