import { useRef } from "react";
import Head from "next/head";
import { RightArrow, LeftArrow } from "../utils/svgs";
import Slider from "react-slick";
import styles from "../styles/portfolio.module.scss";
import projects from "../utils/projects";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "../components/Nav";

const portfolio = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const prev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className={styles.carousel}>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Nav />

      <span onClick={prev} className={`${styles.arrow_button} ${styles.prev}`}>
        <LeftArrow />
      </span>
      <span onClick={next} className={`${styles.arrow_button} ${styles.next}`}>
        <RightArrow />
      </span>

      <Slider ref={sliderRef} {...settings}>
        {projects.map((project) => (
          <div key={project.id}>
            <div className={styles.cover}></div>
            <a
              href={project.link}
              rel="noreferrer noopener"
              target="_blank"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
              className={styles.slide}
            >
              <div className={styles.cover}>
                <div className={styles.text}>
                  <h2 className={styles.h2}>{project.name}</h2>
                  <div className={styles.red_line}></div>
                  <p>{project.desc}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default portfolio;
