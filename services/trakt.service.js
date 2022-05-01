import axios from "axios";

const baseUrl = "https://api.trakt.tv";
const cliend_id = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;

const config = {
  headers: {
    "Content-type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": cliend_id,
  },
};

const getLastWatched = async (user) => {
  try {
    const res = await axios.get(`${baseUrl}/users/${user}/history`, config);
    return res.data[0];
  } catch (e) {
    console.log(e);
  }
};

export default {
  getLastWatched,
};
