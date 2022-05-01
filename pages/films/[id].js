import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";

import { useAuth } from "../../contexts/AuthContext";
import tmdbService from "../../services/tmdb.service";
import backendService from "../../services/backend.service";
import { dateToWord } from "../../utils/dateToWord";
import styles from "../../styles/films/movie_id.module.scss";
import { Hero } from "../../styled-components/movie_id";
import { ratingToStar } from "../../utils/ratingToStar";
import { Container } from "../../styled-components/films/films";
import Modal from "../../components/Modal";
import Layout from "../../components/Layout";
import { dateToYear } from "../../utils/dateToWord";
import { close } from "../../utils/modal_animation";
import { CheckIcon } from "../../utils/svgs";
import { isoToWord } from "../../utils/isoToWord";
import { ordinal_suffix_of } from "../../utils/ordinal_suffix";

const moviePage = ({ movie, movieOnDB }) => {
  const { isAuthenticated } = useAuth();
  const [offsetY, setOffsetY] = useState(0);
  const { register, handleSubmit } = useForm();
  const inputDateLimit = new Date().toISOString().slice(0, 10);
  const [inputDateDisplay, setInputDateDisplay] = useState(false);
  const [inputDateValue, setInputDateValue] = useState(inputDateLimit);
  const modalRef = useRef(null);
  const columnRef = useRef(null);

  const backdrop = movie.backdrop_path;
  const num_of_plays = movieOnDB?.plays.length;
  const [rating, setRating] = useState(null);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeDate = ({ target }) => setInputDateValue(target.value);
  const ratingChanged = (newRating) => {
    setRating((newRating * 10) / 5);
  };

  const onSubmit = async (data, e) => {
    const watchedMovie = {
      title: movie.title,
      release_date: movie.release_date,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      genres: movie.genres,
      tmdb_id: movie.id,
    };
    const watched_date = data.watched_date;
    const time_now = new Date().toLocaleTimeString();
    if (watched_date && inputDateDisplay) {
      const last_watched_at = new Date(
        `${watched_date} ${time_now}`
      ).toISOString();

      close(modalRef.current, columnRef.current);

      const res = await backendService.addMovieToWatched({
        watchedMovie,
        rating,
        last_watched_at,
      });

      e.target.reset();

      return res;
    }

    close(modalRef.current, columnRef.current);
    const res = await backendService.addMovieToWatched({
      watchedMovie,
      rating,
    });

    e.target.reset();

    return res;
  };

  return (
    <div>
      <Head>
        <title>{movie.title}</title>
      </Head>

      <Layout>
        {isAuthenticated && (
          <Modal
            columnRef={columnRef}
            modalRef={modalRef}
            className={styles.modal}
          >
            <div className={styles.column1}>
              <div>
                <div className={styles.img_wrapper}>
                  <img
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  />
                </div>
              </div>
            </div>
            <div className={styles.column2}>
              <div className={styles.text_wrapper}>
                <h4>I watched...</h4>
                <h3>
                  {movie.title}{" "}
                  <span className={styles.release_year}>
                    {dateToYear(movie.release_date)}
                  </span>
                </h3>
              </div>

              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.specify_button_wrapper}>
                  <input
                    className={styles.specify_button}
                    type="checkbox"
                    id="specify_button"
                    name="specify"
                    onClick={({ target }) =>
                      target.checked
                        ? setInputDateDisplay(true)
                        : setInputDateDisplay(false)
                    }
                  />
                  {!inputDateDisplay && (
                    <label htmlFor="specify_button">
                      Specify the date you watched it
                    </label>
                  )}

                  {inputDateDisplay && (
                    <input
                      className={styles.date_input}
                      type="date"
                      {...register("watched_date")}
                      max={inputDateLimit}
                      value={inputDateValue}
                      onChange={changeDate}
                    />
                  )}
                </div>

                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={28}
                  activeColor="#ffd700"
                  isHalf
                />
                <button className={styles.save_button}>Save</button>
              </form>
            </div>
          </Modal>
        )}

        <Hero
          style={{ backgroundPosition: `50% ${offsetY * -0.5}px` }}
          className={styles.hero}
          backdrop={backdrop}
        >
          <div className={styles.container}>
            <div className={styles.row1}>
              <div className={styles.column}>
                <h1 className={styles.title}>
                  {movie.title}
                  <span className={styles.typing_cursor}>_</span>
                </h1>
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

        <section className={styles.details_section}>
          <Container className={styles.container1}>
            <div className={styles.row1}>
              <div className={`${styles.column} ${styles.column1}`}>
                <span className={styles.label}>Release Date</span>
                <span className={styles.value}>
                  {dateToWord(movie.release_date)}
                </span>
              </div>
              <div className={`${styles.column} ${styles.column2}`}>
                <span className={styles.label}>Genres</span>
                <span className={styles.value}>
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </span>
              </div>
              <div className={`${styles.column} ${styles.column3}`}>
                <span className={styles.label}>Status</span>

                <span className={styles.value}>
                  {num_of_plays > 0
                    ? `Watched ${num_of_plays > 1 ? `(${num_of_plays})` : ""}`
                    : "Haven't Watched Yet"}
                  {num_of_plays > 0 && (
                    <span className={styles.check_icon_wrapper}>
                      <CheckIcon />
                    </span>
                  )}
                </span>
              </div>
              <div className={`${styles.column} ${styles.column4}`}>
                <span className={styles.label}>Rating</span>
                {movieOnDB?.rating && (
                  <span className={`${styles.value} ${styles.star_rating}`}>
                    {ratingToStar(movieOnDB.rating)}
                  </span>
                )}

                {!movieOnDB?.rating && (
                  <span className={styles.value}>Haven't Rated Yet</span>
                )}
              </div>
            </div>
          </Container>

          <Container className={styles.container2}>
            {movie.tagline && (
              <div className={styles.row1}>
                <div className={` ${styles.column} ${styles.column1}`}>
                  <h2>Tagline</h2>
                </div>
                <div className={` ${styles.column} ${styles.column2} `}>
                  <p>{movie.tagline}</p>
                </div>
              </div>
            )}

            <div className={styles.row2}>
              <div className={` ${styles.column} ${styles.column1}`}>
                <h2>Overview</h2>
              </div>
              <div className={` ${styles.column} ${styles.column2} `}>
                <p>{movie.overview}</p>
              </div>
            </div>
          </Container>
        </section>

        {num_of_plays && (
          <section className={styles.num_of_play_section}>
            <Container className={styles.container1}>
              <div>
                <div>
                  <div className={styles.card_wrapper}>
                    {movieOnDB.plays.map((play, i) => {
                      return (
                        <div key={play.id} className={styles.card}>
                          <Link href={`/films/${movieOnDB.tmdb_id}/${play.id}`}>
                            <a></a>
                          </Link>
                          <div className={styles.date_wrapper}>
                            {play.last_watched_at && (
                              <span
                                className={`${styles.date} ${styles.date_month}`}
                              >
                                {isoToWord(play.last_watched_at)?.split(" ")[0]}
                              </span>
                            )}
                            {play.last_watched_at && (
                              <span
                                className={`${styles.date} ${styles.date_day}`}
                              >
                                {isoToWord(play.last_watched_at)?.split(" ")[1]}
                              </span>
                            )}
                            {!play.last_watched_at && <span>Not</span>}
                            {!play.last_watched_at && <span>Available</span>}
                          </div>
                          <div className={styles.detail_wrapper}>
                            <p>
                              {ordinal_suffix_of(i + 1)} play of {movie.title}
                            </p>
                          </div>
                          <div className={styles.rating_wrapper}>
                            <span>{ratingToStar(play.rating)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const movie = await tmdbService.getMovie(id);
  const movieOnDB = await backendService.getMovie(id);
  let notFound = false;

  if (movie.success === false) {
    context.res.statusCode = 404;
    notFound = true;
  }

  return {
    props: {
      movie,
      movieOnDB: movieOnDB || null,
    },
    notFound,
  };
};

export default moviePage;
