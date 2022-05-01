import styles from "./traktLastPlayed.module.scss";
import theatre_img from "../../public/assets/images/theatre.jpg";

const TraktLastPlayed = ({ data, style, traktRef }) => {
  const title = data?.name || data?.title;
  const director = data?.casts?.crew.find(
    (crew) => crew.job === "Director"
  ).name;
  const video_key = data?.videos?.results[0]?.key;
  const backdrop = data.backdrop_path
    ? `url(http://image.tmdb.org/t/p/w1280${data.backdrop_path})`
    : `url(${theatre_img})`;

  return (
    <div iv ref={traktRef} style={style} className={styles.trakt_container}>
      <div
        style={{
          backgroundImage: backdrop,
        }}
        className={styles.backdrop}
      ></div>

      <div className={styles.row2}>
        <div>
          <span className={styles.last_watched}>Last watched</span>
        </div>
        <div className={styles.details_container}>
          <div className={styles.poster_wrapper}>
            <img src={`http://image.tmdb.org/t/p/w780${data.poster_path}`} />
          </div>
          <div className={styles.details_wrapper}>
            <p>
              <a
                href="https://trakt.tv/users/whiteravenn"
                target="_blank"
                rel="noreferrer noopener"
              >
                {title}
              </a>
            </p>
            <p>by {director || data?.created_by[0].name}</p>
            {video_key && (
              <p>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://www.youtube.com/watch?v=${video_key}`}
                >
                  Preview
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraktLastPlayed;
