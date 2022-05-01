import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/home.module.scss";

import Loader from "../components/Loader.js";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import SpotifyPlayer from "../components/SpotifyPlayer";
import TraktLastPlayed from "../components/TraktLastPlayed";
import { HeadphoneIcon, HoverIcon, ClapperBoardIcon } from "../utils/svgs";
import FloatingStatusButton from "../components/FloatingStatusButton";

import spotifyService from "../services/spotify.service";
import traktService from "../services/trakt.service";
import tmdbService from "../services/tmdb.service";

import gsapAnim from "../utils/display_animation";

export default function Home(params) {
  const [loading, setLoading] = useState(true);
  const [isSpotifyVisible, setSpotifyVisibility] = useState(false);
  const [isTraktVisible, setTraktVisibility] = useState(false);

  const spotifyRef = useRef(null);
  const traktRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (isTraktVisible) {
      return gsapAnim.showBlock(traktRef.current);
    }
    return gsapAnim.hide(traktRef.current);
  }, [isTraktVisible]);

  useEffect(() => {
    if (isSpotifyVisible) {
      return gsapAnim.showFlex(spotifyRef.current);
    }

    return gsapAnim.hide(spotifyRef.current);
  }, [isSpotifyVisible]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      {loading && <Loader />}

      {/* <div className={styles.status_container}>
        <SpotifyPlayer
          data={params.spotifyData || params.lastSpotifyPlayed}
          spotifyRef={spotifyRef}
        />
        <TraktLastPlayed data={params.lastWatched} traktRef={traktRef} />
      </div> */}

      {/* <FloatingStatusButton
        music_action={() => setSpotifyVisibility(!isSpotifyVisible)}
        media_action={() => setTraktVisibility(!isTraktVisible)}
      /> */}

      <Layout showSocial mainClassName={styles.main}>
        <Hero />
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const token = await spotifyService.getSpotifyToken();
  let data = await spotifyService.getCurrentlyPlaying(token);
  const lastSpotifyPlayed = await spotifyService.getLastPlayed(token);
  const lastTraktWatched = await traktService.getLastWatched("whiteravenn");
  // const lastWatchedInfos = await tmdbService.getMediaInfo(
  //   lastTraktWatched?.show?.ids?.tmdb || lastTraktWatched.movie.ids.tmdb,
  //   lastTraktWatched.type
  // );

  // if (data.currently_playing_type === "episode") {
  //   data = await spotifyService.getCurrentlyPlaying(token, "?type=episode");
  // }

  return {
    props: {
      // spotifyData: data || null,
      // lastSpotifyPlayed: lastSpotifyPlayed || null,
      // lastWatched: lastWatchedInfos || null,
    },
  };
};
