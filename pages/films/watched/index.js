import { Fragment } from "react";
import Link from "next/link";
import Head from "next/head";

import Layout from "../../../components/Layout";
import { Banner } from "../../../styled-components/films/all";
import { Container } from "../../../styled-components/films/films";
import FilmCard from "../../../components/FilmCard";
import PaginationButton from "../../../components/PaginationButton";
import { filter_genres } from "../../../utils/filter_genres";
import FilterNav from "../../../components/FilterNav";

import backendService from "../../../services/backend.service";
import styles from "../../../styles/films/watched/all.module.scss";

const watched = ({ movies, filter_genre, page, sort, sort_name }) => {
  return (
    <>
      <Head>
        <title>Films</title>
      </Head>
      <Layout mainClassName={styles.main}>
        <Banner className={styles.banner}>
          <div className={styles.container1}>
            <div className={styles.row1}>
              <div className={styles.column1}>
                <h1>Films</h1>
              </div>
            </div>
          </div>
        </Banner>

        <section className={styles.film_section}>
          <Container className={styles.container1}>
            <div className={styles.row1}>
              <div className={styles.column1}>
                <FilterNav
                  filter_genre={filter_genre}
                  sort={sort}
                  filter_genres={filter_genres}
                  sort_name={sort_name}
                />

                <div className={styles.films_wrapper}>
                  {movies.results.map((movie) => {
                    return (
                      <Fragment key={movie.id}>
                        <FilmCard
                          className={styles.card}
                          className_img_wrapper={styles.img_wrapper}
                          movie={movie}
                          showCardFooter
                        />
                      </Fragment>
                    );
                  })}
                </div>

                <PaginationButton
                  className={styles.pagination_button}
                  total_pages={movies.total_pages}
                  current_page={movies.page}
                  link="/films/watched"
                  type="release_date_desc"
                  sort={sort}
                  genre={filter_genre}
                />
              </div>
            </div>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const page = parseInt(context.query.page);
  const genre = !!context.query.genre ? context.query.genre : null;
  const sort = !!context.query.sort ? context.query.sort : null;
  const allMovies = await backendService.getAllMovies(page, genre, sort);

  let sort_name =
    sort?.split("_").length > 1 ? sort.split("_").slice(0, 2).join(" ") : sort;

  if (sort_name === "name") {
    sort_name = "film name";
  }

  return {
    props: {
      movies: allMovies,
      page: page || "1",
      filter_genre: genre || null,
      sort: sort || "release_date_newest",
      sort_name: sort_name || "release date",
    },
  };
};

export default watched;
