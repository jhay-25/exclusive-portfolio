import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
let token;

const setToken = (newToken) => {
  token = newToken;
};

const addMovieToWatched = async (movie) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  try {
    const res = await axios.post(`${baseUrl}movie`, movie, config);
    return res.data;
  } catch (e) {
    return e.data;
  }
};

const getMovie = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}movie/${id}`);
    return res.data;
  } catch (e) {
    return e.data;
  }
};

const getHistory = async () => {
  try {
    const res = await axios.get(`${baseUrl}movie/history`);
    return res.data;
  } catch (e) {
    return e.data;
  }
};

const getAllMovies = async (page, genre, sort) => {
  try {
    let backendUrl = `${baseUrl}movie/all?page=${page ? page : "1"}`;

    if (genre) {
      backendUrl = backendUrl.concat(`&genre=${genre}`);
    }

    if (sort) {
      backendUrl = backendUrl.concat(`&sort=${sort}`);
    }

    const res = await axios.get(backendUrl);

    return res.data;
  } catch (e) {
    return e.data;
  }
};

const updatePlay = async (update, id) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  try {
    const res = await axios.put(`${baseUrl}movie/play/${id}`, update, config);
    return res.data;
  } catch (e) {
    return e.data;
  }
};

const getPlay = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}movie/play/${id}`);
    return res.data;
  } catch (e) {
    return e.data;
  }
};

const deletePlay = async (id) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  try {
    const res = await axios.delete(`${baseUrl}movie/play/${id}`, config);
    return res.data;
  } catch (e) {
    return e.data;
  }
};

export default {
  addMovieToWatched,
  setToken,
  getMovie,
  getHistory,
  getAllMovies,
  updatePlay,
  getPlay,
  deletePlay,
};
