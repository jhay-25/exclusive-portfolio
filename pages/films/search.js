import Link from "next/link";

import Layout from "../../components/Layout";
import PaginationButton from "../../components/PaginationButton";
import { Container } from "../../styled-components/films/films";
import tmdbService from "../../services/tmdb.service";
import { dateToYear } from "../../utils/dateToWord";
import styles from "../../styles/films/search.module.scss";
import { result } from "lodash";

const search = ({ query, results }) => {
  return (
    <>
      <Layout mainClassName={styles.main}>
        <section className={styles.search_section}>
          <Container className={styles.container1}>
            <div className={styles.row1}>
              <div className={styles.column1}>
                <div className={styles.header}>
                  {!!query && <h3>Search results for "{query}"</h3>}
                  {query === null && <h3>You haven't search a thing</h3>}
                </div>
              </div>
            </div>
          </Container>

          <Container className={styles.container2}>
            <div className={styles.row2}>
              <div className={styles.column1}>
                {query && results.results.length > 0 && (
                  <>
                    <PaginationButton
                      className={styles.pagination_button}
                      total_pages={results.total_pages}
                      current_page={results.page}
                      type="none"
                      link="/films/search"
                      query={query.split(" ").join("+")}
                    />
                    <div className={styles.film_result_container}>
                      {results &&
                        results.results.map((item) => {
                          return (
                            <div className={styles.img_wrapper} key={item.id}>
                              <Link href={`/films/${item.id}`}>
                                <a>
                                  {item.poster_path && (
                                    <img
                                      src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
                                      alt="film poster"
                                    />
                                  )}

                                  {!item.poster_path && (
                                    <div className={styles.alt_poster}></div>
                                  )}
                                </a>
                              </Link>
                              <span className={styles.title}>{item.title}</span>
                            </div>
                          );
                        })}
                    </div>
                    <PaginationButton
                      className={styles.pagination_button}
                      total_pages={results.total_pages}
                      current_page={results.page}
                      type="none"
                      link="/films/search"
                      query={query.split(" ").join("+")}
                    />
                  </>
                )}

                {query && !results.results.length && (
                  <div className={styles.not_found_wrapper}>
                    <h1>Nothing found :(</h1>
                  </div>
                )}
              </div>
            </div>
          </Container>

          <Container className={styles.container3}>
            <div className={styles.row1}>
              <div className={styles.column1}>
                <div className={styles.form_wrapper}>
                  <h3>Search for a movie</h3>
                  <form onSubmit={search}>
                    <input
                      className={styles.search_bar}
                      type="text"
                      name="query"
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
  const query = context.query?.query?.split("+").join("");
  const page = context.query.page;
  let results;

  if (query) {
    results = await tmdbService.searchMovie(query, page);
  }

  return {
    props: {
      query: query || null,
      results: results || null,
    },
  };
};

export default search;
