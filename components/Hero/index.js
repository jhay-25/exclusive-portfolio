import Typewriter from "typewriter-effect";

import styles from "./hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.row}>
        <div className={styles.text_wrapper}>
          <p className={`subheading1`}>Hi, welcome to my personal website.</p>
          <h1 className={`${styles.h1}`}>
            <Typewriter
              options={{
                strings: ["WELCOME", "BIENVENIDO", "WELCAM"],
                autoStart: true,
                loop: true,
                deleteSpeed: 20,
                cursor: "_",
              }}
            />
          </h1>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Hero;
