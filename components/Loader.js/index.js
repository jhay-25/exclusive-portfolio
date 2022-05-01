import { useEffect } from "react";
import styles from "./loader.module.scss";
import gsap from "gsap";

const Loader = () => {
  useEffect(() => {
    const tl = gsap.timeline({ duration: 3 });

    tl.to(
      "#loader p",
      {
        opacity: 0,
      },
      1
    ).to(
      "#loader",
      {
        yPercent: -100,
        ease: "Power2.easeIn",
      },
      2
    );
  }, []);

  return (
    <div id="loader" className={styles.loader}>
      <p className="text">John Carlo | Frontend Developer</p>
    </div>
  );
};

export default Loader;
