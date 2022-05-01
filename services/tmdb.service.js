import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const api_key = process.env.NEXT_PUBLIC_TMDB_KEY;

const getMediaInfo = async (id, type) => {
  try {
    const res = await axios.get(
      `${baseUrl}/${
        type === "episode" ? "tv" : "movie"
      }/${id}${api_key}&append_to_response=casts,videos`
    );
    return res.data;
  } catch (e) {
    return e.data;
  }
};

const searchMovie = async (query, page) => {
  try {
    const res = await axios.get(
      `${baseUrl}/search/movie${api_key}&query=${query}&page=${
        page ? page : "1"
      }`
    );
    return res.data;
  } catch (e) {
    return e.data;
  }
};

const getMovie = async (id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/movie/${id}${api_key}&append_to_response=release_dates,credits,videos`
    );
    return res.data;
  } catch (e) {
    return e.data;
  }
};

export default {
  getMediaInfo,
  searchMovie,
  getMovie,
};
