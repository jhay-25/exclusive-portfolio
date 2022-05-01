import Nav from "../Nav";
import FloatingSocialLinks from "../FloatingSocialLinks";
import styles from "./layout.module.scss";

const Layout = ({ children, mainClassName, showSocial }) => {
  return (
    <>
      <Nav />
      <main className={`${mainClassName} ${styles.main}`}>
        {showSocial && <FloatingSocialLinks />}
        {children}
      </main>
    </>
  );
};

export default Layout;
