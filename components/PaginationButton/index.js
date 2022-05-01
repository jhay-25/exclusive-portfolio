import { useState } from "react";
import Link from "next/link";
import styles from "./pagination_button.module.scss";
import clsx from "clsx";

const PaginationButton = ({
  className,
  total_pages,
  current_page,
  link,
  type,
  query,
  sort,
  genre,
}) => {
  let middle_button = current_page;
  let left_hand = current_page - 2;
  let right_hand = current_page + 2;
  let items = [];

  if (left_hand <= 0) left_hand = 1;
  if (right_hand > total_pages) right_hand = total_pages;

  for (let number = left_hand; number <= right_hand; number++) {
    items.push(number);
  }

  return (
    <div className={`${className} ${styles.pagination_container}`}>
      <ul className={styles.button_wrapper}>
        {current_page - 1 !== 0 && (
          <li>
            <Link
              href={`${link}?page=${current_page - 1}&query=${
                query && `${query}`
              }${sort ? `&sort=${sort}` : "&sort="}${
                genre ? `&genre=${genre}` : "&genre="
              }`}
            >
              <a className={styles.prev_next}>prev</a>
            </Link>
          </li>
        )}

        {items.map((item) => (
          <li>
            <Link
              href={`${link}?page=${item}&query=${query && `${query}`}${
                sort ? `&sort=${sort}` : "&sort="
              }${genre ? `&genre=${genre}` : "&genre="}`}
            >
              <a className={clsx(current_page === item && styles.active)}>
                {item}
              </a>
            </Link>
          </li>
        ))}

        {current_page + 1 !== total_pages + 1 && (
          <li>
            <Link
              href={`${link}?page=${current_page + 1}&query=${
                query && `${query}`
              }${sort ? `&sort=${sort}` : "&sort="}${
                genre ? `&genre=${genre}` : "&genre="
              } `}
            >
              <a className={styles.prev_next}>next</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PaginationButton;
