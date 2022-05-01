import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";

import Layout from "../../../components/Layout";
import backendService from "../../../services/backend.service";
import styles from "../../../styles/films/[id]/play.module.scss";
import { dateToYear } from "../../../utils/dateToWord";
import { useAuth } from "../../../contexts/AuthContext";

const play = ({ play }) => {
  const { register, handleSubmit } = useForm();
  const { isAuthenticated } = useAuth();
  const inputDateLimit = new Date().toISOString().slice(0, 10);
  const [inputDateValue, setInputDateValue] = useState("");
  const [starRating, setStarRating] = useState(play.rating);
  const [isSubmitted, setSubmitted] = useState(false);
  const [notif, setNotif] = useState(null);
  const backdrop_path = play.movie.backdrop_path;

  const changeRating = (newRating) => {
    setStarRating((newRating * 10) / 5);
  };

  const changeDate = ({ target }) => setInputDateValue(target.value);

  const update = async (data) => {
    const update = {
      last_watched_at: inputDateValue,
      rating: starRating,
    };

    const res = await backendService.updatePlay(update, play.id);

    setSubmitted(true);
    setNotif("Successfully updated");
    return;
  };

  const deletePlay = async () => {
    const res = await backendService.deletePlay(play.id);

    setSubmitted(true);
    setNotif("Successfully deleted");
    return;
  };

  useEffect(() => {
    if (play.last_watched_at) {
      setInputDateValue(
        new Date(play?.last_watched_at).toISOString().slice(0, 10)
      );
    }
  }, []);

  return (
    <>
      <Layout>
        <section
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
          }}
          className={styles.update_form_section}
        >
          <div className={styles.card}>
            <div className={styles.column1}>
              <div>
                <div className={styles.img_wrapper}>
                  <img
                    src={`https://image.tmdb.org/t/p/w780${play.movie.poster_path}`}
                    alt="movie poster"
                  />
                </div>
              </div>

              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
                }}
                className={styles.backdrop}
              ></div>
            </div>
            <div className={styles.column2}>
              <div className={styles.text_wrapper}>
                <h4>I'm updating...</h4>
                <h3>
                  {play.movie.title}{" "}
                  <span className={styles.release_year}>
                    {dateToYear(play.movie.release_date)}
                  </span>
                </h3>
              </div>

              <form onSubmit={handleSubmit(update)} className={styles.form}>
                <div className={styles.specify_button_wrapper}>
                  <input
                    className={styles.date_input}
                    type="date"
                    {...register("watched_date")}
                    max={inputDateLimit}
                    value={inputDateValue}
                    onChange={changeDate}
                  />
                </div>

                <ReactStars
                  count={5}
                  onChange={changeRating}
                  size={28}
                  activeColor="#ffd700"
                  isHalf
                  value={(starRating * 5) / 10}
                />
                {!isSubmitted && (
                  <div>
                    <button
                      type="submit"
                      disabled={!isAuthenticated}
                      className={`${styles.save_button} ${styles.button}`}
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      disabled={!isAuthenticated}
                      className={`${styles.delete_button} ${styles.button}`}
                      onClick={deletePlay}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {notif && <p className={styles.notification}>{notif}</p>}
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.params.playId;
  const play = await backendService.getPlay(id);
  let notFound = false;

  if (!play) {
    context.res.statusCode = 404;
    notFound = true;
  }

  return {
    props: {
      play: play || null,
    },
    notFound,
  };
};

export default play;
