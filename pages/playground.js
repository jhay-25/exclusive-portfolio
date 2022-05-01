import Head from "next/head";
import Link from "next/link";

import styles from "../styles/playground.module.scss";

import Layout from "../components/Layout";
import { ClapperBoardIcon } from "../utils/svgs";

import road from "../public/assets/images/road.jpg";

const playground = () => {
  return (
    <>
      <Head>
        <title>Playground</title>
      </Head>

      <Layout showSocial mainClassName={styles.main}>
        <div className={styles.row}>
          <div className={styles.image_wrapper}>
            <img src={road} alt="road" />
          </div>
          <div className={styles.button_wrapper}>
            <Link href="/films">
              <a className={styles.button}>
                <span className={styles.small_icon}>
                  <ClapperBoardIcon />
                </span>
                <span className={styles.large_icon}>
                  <ClapperBoardIcon />
                </span>
                <div>
                  <h2>Film Tracking</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout
                  </p>
                </div>
              </a>
            </Link>
            <div className={styles.button}></div>
            <div className={styles.button}></div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default playground;
