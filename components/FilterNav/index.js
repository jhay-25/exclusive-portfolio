import Link from "next/link";

import styles from "./filter_nav.module.scss";
import { DropDownIcon } from "../../utils/svgs";

const FilterNav = ({ filter_genre, sort, filter_genres, sort_name }) => {
  return (
    <div className={styles.nav_filter_wrapper}>
      <div>
        <Link href="/films/watched">
          <a>Watched</a>
        </Link>
      </div>
      <div className={styles.filter_wrapper}>
        <div className={`${styles.filter_button} ${styles.filter_genre}`}>
          <span className={styles.value}>
            {filter_genre ? filter_genre : "All"}
          </span>
          <div className={styles.drop_down_icon_wrapper}>
            <DropDownIcon />
          </div>
          <ul
            className={`${styles.drop_down_links_wrapper} ${styles.drop_down_links_wrapper_genre}`}
          >
            <div className={styles.filter_button}>
              <span className={styles.value}>
                {filter_genre ? filter_genre : "All"}
              </span>
              <div className={styles.drop_down_icon_wrapper}>
                <DropDownIcon />
              </div>
            </div>
            <li className={styles.all}>
              <Link href={`/films/watched${sort && `?sort=${sort}`}`}>
                <a className={`${!filter_genre && styles.active}`}>All</a>
              </Link>
            </li>
            {filter_genres.map((genre, i) => (
              <li key={i}>
                <Link
                  href={`/films/watched?page=1&genre=${genre}&sort=${sort}`}
                >
                  <a className={`${filter_genre === genre && styles.active}`}>
                    {genre}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.filter_button}`}>
          <span className={styles.label}>Sort by</span>
          <span
            className={`${styles.value} ${styles.sort_value} ${styles.filter_sort_value}`}
          >
            {sort_name}
            <div className={styles.drop_down_icon_wrapper}>
              <DropDownIcon />
            </div>
            <ul
              className={`${styles.drop_down_links_wrapper} ${styles.drop_down_links_wrapper_sort}`}
            >
              <div className={styles.filter_button}>
                <span className={`${styles.value}`}>
                  {sort_name}
                  <div className={styles.drop_down_icon_wrapper}>
                    <DropDownIcon />
                  </div>
                </span>
              </div>

              <li>
                <Link
                  href={`/films/watched?page=1${
                    filter_genre && `&genre=${filter_genre}`
                  }&sort=name`}
                >
                  <a className={sort === "name" && styles.active}>Film Name</a>
                </Link>
              </li>

              <li>
                <span>Release Date</span>
              </li>
              <div className={styles.right_side}>
                <li>
                  <Link
                    href={`/films/watched?page=1${
                      filter_genre && `&genre=${filter_genre}`
                    }`}
                  >
                    <a
                      className={
                        sort === "release_date_newest" && styles.active
                      }
                    >
                      Newest First
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/films/watched?page=1${
                      filter_genre && `&genre=${filter_genre}`
                    }&sort=release_date_early`}
                  >
                    <a
                      className={sort === "release_date_early" && styles.active}
                    >
                      Earliest First
                    </a>
                  </Link>
                </li>
              </div>

              <li>
                <span>John's Rating</span>
              </li>

              <div className={styles.right_side}>
                <li>
                  <Link
                    href={`/films/watched?page=1${
                      filter_genre && `&genre=${filter_genre}`
                    }&sort=rating`}
                  >
                    <a className={sort === "rating" && styles.active}>
                      Highest First
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/films/watched?page=1${
                      filter_genre && `&genre=${filter_genre}`
                    }&sort=rating_lowest`}
                  >
                    <a className={sort === "rating_lowest" && styles.active}>
                      Lowest First
                    </a>
                  </Link>
                </li>
              </div>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterNav;
