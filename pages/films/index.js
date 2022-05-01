import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import backendService from "../../services/backend.service";

import Layout from "../../components/Layout";
import { Hero } from "../../styled-components/movie_id";
import { Container } from "../../styled-components/films/films";
import styles from "../../styles/films/film.module.scss";
import FilmCard from "../../components/FilmCard";

const films = ({ history }) => {
  const router = useRouter();
  const [offsetY, setOffsetY] = useState(0);
  const [query, setQuery] = useState("");
  const recently_watched = history.slice(0, 6);
  const last_watched = history[0];
  const backdrop = last_watched?.movie.backdrop_path;

  const handleScroll = () => setOffsetY(window.pageYOffset);

  const search = (e) => {
    e.preventDefault();
    const movie = query.split(" ").join("+");

    router.push(`/films/search?query=${movie}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Films</title>
      </Head>
      <Layout>
        <Hero
          style={{ backgroundPosition: `50% ${offsetY * -0.5}px` }}
          className={styles.hero}
          backdrop={backdrop}
        >
          <div className={styles.container}>
            <div className={styles.row1}>
              <div className={styles.column}>
                {last_watched && (
                  <h1 className={styles.title}>
                    <span className={styles.subtitle}>Last Watched</span>
                    <Link href={`/films/${last_watched.movie.tmdb_id}`}>
                      <a>{last_watched.movie.title}</a>
                    </Link>
                    <span className={styles.typing_cursor}>_</span>
                  </h1>
                )}
              </div>
            </div>
            <div className={styles.row2}>
              <div>
                <span className={styles.mouse}>
                  <span className={styles.scroll}></span>
                </span>
              </div>
            </div>
          </div>
        </Hero>

        <section className={styles.recently_watched_section}>
          <Container className={styles.container1}>
            <div className={`${styles.row} ${styles.row1}`}>
              <div className={styles.column}>
                <h2>Recently Watched Films</h2>
              </div>
            </div>
            <div className={`${styles.row} ${styles.row2}`}>
              <div className={styles.column}>
                <div className={styles.film_card_container}>
                  {recently_watched.map((movie) => (
                    <Fragment key={movie.id}>
                      <FilmCard
                        movie={movie}
                        showWatchedDate
                        className={styles.card}
                        className_img_wrapper={styles.img_wrapper}
                        showCardFooter
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className={styles.see_all_section}>
          <Container className={styles.container1}>
            <div>
              <div>
                <Link href="/films/watched">
                  <a className={styles.see_all_button}>View watched films</a>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className={styles.search_section}>
          <Container className={styles.container1}>
            <div className={styles.row1}>
              <div className={styles.column1}>
                <div className={styles.form_wrapper}>
                  <h3>Search for a movie</h3>
                  <form onSubmit={search}>
                    <input
                      className={styles.search_bar}
                      onChange={({ target }) => setQuery(target.value)}
                      type="text"
                      placeholder="Search, you fools!"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const history = await backendService.getHistory();

  return {
    props: {
      history,
    },
  };
};

export default films;
