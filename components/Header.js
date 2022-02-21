import Link from "next/link";
import React, { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";
import Search from "./Search";
import {
  FaHandHolding,
  FaHandHoldingHeart,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import ToggleSwitch from "./ToggleSwitch";
import { useModeSwitch } from "@/context/ModeContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [mode, setMode] = useModeSwitch();
  return (
    <header
      className={`${styles.header} ${
        mode ? styles.askheader : styles.giveheader
      }`}
    >
      <div className={styles.logo}>
        <Link href="/">
          <a>
            {mode ? (
              <FaHandHolding size="1.5em" />
            ) : (
              <FaHandHoldingHeart size="1.5em" />
            )}
            Helps Home
          </a>
        </Link>
      </div>
      {user && <Search />}

      <nav>
        <ul>
          {/* <li>
            <Link href="/helps">
              <a>Helps</a>
            </Link>
          </li> */}
          {user ? (
            <>
              <li>
                <Link href="/helps/add">
                  <a>Add Help</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>{user && user.username.toUpperCase()} - Dashboard</a>
                </Link>
              </li>
              <li>
                <ToggleSwitch label="Show Help Requests" />
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
