import axios from "axios";

const baseUrl = "https://api.spotify.com/v1/me/player";
const refreshToken = process.env.NEXT_PUBLIC_REFRESH_TOKEN;
const spotifyAuthorization = process.env.NEXT_PUBLIC_SPOTIFY_AUTHORIZATION;

const getSpotifyToken = async () => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    const config = {
      headers: {
        authorization: `Basic ${spotifyAuthorization}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      config
    );

    return res.data.access_token;
  } catch (e) {
    console.log(e);
  }
};

const getCurrentlyPlaying = async (token, query) => {
  try {
    const config = { headers: { authorization: `Bearer ${token}` } };
    const res = await axios.get(`${baseUrl}${query ? query : ""}`, config);

    return res?.data;
  } catch (e) {
    console.log(e);
  }
};

const getLastPlayed = async (token) => {
  try {
    const config = { headers: { authorization: `Bearer ${token}` } };
    const res = await axios.get(`${baseUrl}/recently-played`, config);

    return res?.data.items[0];
  } catch (e) {
    console.log(e);
  }
};

export default {
  getCurrentlyPlaying,
  getSpotifyToken,
  getLastPlayed,
};
