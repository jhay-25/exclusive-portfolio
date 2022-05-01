import Link from "next/link";

import { dateToYear } from "../../utils/dateToWord";
import { ratingToStar } from "../../utils/ratingToStar";
import { isoToWord } from "../../utils/isoToWord";
import styles from "./film_card.module.scss";

const FilmCard = ({
  movie,
  showWatchedDate,
  className,
  className_img_wrapper,
  showCardFooter,
}) => {
  const movie_title = movie?.title || movie.movie.title;
  const release_date = movie?.release_date || movie?.movie?.release_date;
  const poster_path = movie?.poster_path || movie?.movie?.poster_path;

  return (
    <div
      data-tooltip={`${movie_title} ${
        release_date ? `(${dateToYear(release_date)})` : ""
      }`}
      className={`${styles.card} ${className}`}
    >
      <div className={`${styles.img_wrapper} ${className_img_wrapper}`}>
        <Link href={`/films/${movie?.tmdb_id || movie.movie.tmdb_id}`}>
          <a>
            <img src={`https://image.tmdb.org/t/p/w780${poster_path}`} />
          </a>
        </Link>
      </div>
      {showCardFooter && (
        <div className={styles.card_footer}>
          <span>{ratingToStar(movie.rating)}</span>
          {showWatchedDate && (
            <span className={styles.watched_date}>
              {isoToWord(movie.last_watched_at)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilmCard;
