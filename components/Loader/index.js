import { useEffect } from "react";
import styles from "./loader.module.scss";
import gsap from "gsap";

const index = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".transition li", {
      duration: 0.5,
      scaleY: 1,
      transformOrigin: "bottom left",
      stagger: 0.2,
    });

    tl.to(".transition li", {
      duration: 0.5,
      scaleY: 0,
      transformOrigin: "bottom left",
      stagger: 0.1,
      delay: 0.1,
    });
  }, []);

  return (
    <ul class={`${styles.transition} transition`}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};

export default index;
