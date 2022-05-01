import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./nav.module.scss";
import {
  animateOpenMenu,
  animateCloseMenu,
  showMainMenu,
  hideMainMenu,
} from "./animation";
import { useAuth } from "../../contexts/AuthContext";

import { FileIcon } from "./icon";

const Nav = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menu_line_top_ref = useRef(null);
  const menu_line_center_ref = useRef(null);
  const menu_line_bottom_ref = useRef(null);
  const main_menu_ref = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    if (!isOpen) {
      animateOpenMenu(
        menu_line_top_ref.current,
        menu_line_center_ref.current,
        menu_line_bottom_ref.current
      );
      showMainMenu(main_menu_ref.current);
      setIsOpen(!isOpen);
    } else {
      animateCloseMenu(
        menu_line_top_ref.current,
        menu_line_center_ref.current,
        menu_line_bottom_ref.current
      );
      hideMainMenu(main_menu_ref.current);
      setIsOpen(!isOpen);
    }
  };

  const links = [
    {
      id: 1,
      link: "home",
      path: "/",
    },
    {
      id: 2,
      link: "portfolio",
      path: "/portfolio",
    },
    {
      id: 3,
      link: "playground",
      path: "/playground",
    },
    {
      id: 4,
      link: "contact",
      path: "/contact",
    },
  ];

  const logout = () => {
    window.localStorage.clear();
    window.location.reload(true);
  };

  return (
    <header
      className={styles.header}
      style={{
        background: `${isOpen ? "#111" : "transparent"}`,
      }}
    >
      <nav className={styles.nav}>
        <div className={styles.row}>
          <div className={styles.logo_wrapper}>
            <span className={styles.logo}>
              <Link href="/">
                <a>John</a>
              </Link>
            </span>
          </div>
          <div className={styles.links_wrapper}>
            {links.map((link) => {
              return (
                <Link key={link.id} href={`${link.path}`}>
                  <a
                    className={`${styles.nav_link} ${
                      link.path === router.asPath ? styles.active_link : ""
                    }`}
                  >
                    <span className={styles.number}>0{link.id}</span>
                    <span>{link.link}</span>
                  </a>
                </Link>
              );
            })}
          </div>
          <div>
            {!isAuthenticated && (
              <Link href="/auth/signin">
                <a className={`button ${styles.auth_btn}`}>
                  <span>Sign in</span>
                </a>
              </Link>
            )}
            {isAuthenticated && (
              <a onClick={logout} className={`button ${styles.auth_btn}`}>
                <span>Sign out</span>
              </a>
            )}
          </div>
          <div className={styles.menu_wrapper}>
            <div onClick={toggleMenu} className={styles.menu_button}>
              <span
                ref={menu_line_top_ref}
                className={`${styles.menu_line} ${styles.menu_line_top}`}
              ></span>
              <span
                ref={menu_line_center_ref}
                className={`${styles.menu_line} ${styles.menu_line_center}`}
              ></span>
              <span
                ref={menu_line_bottom_ref}
                className={`${styles.menu_line} ${styles.menu_line_bottom}`}
              ></span>
            </div>
          </div>
        </div>
        <ul ref={main_menu_ref} className={styles.main_menu}>
          {links.map((link) => (
            <li
              className={`${styles.link_wrapper} ${
                link.path === router.asPath ? styles.active_link : ""
              }`}
              key={link.id}
            >
              <Link href={`${link.path}`}>
                <a>{link.link}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
