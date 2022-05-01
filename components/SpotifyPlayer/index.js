import { useState } from "react";

import { DownArrow } from "./icons";

import styles from "./spotifyPlayer.module.scss";

const index = ({ data, style, spotifyRef }) => {
  const [isEmbedVisible, setEmbedVisibility] = useState(false);
  const type = data.currently_playing_type || "track";
  const track = data.item || data.track,
    title = track.name;
  let image, artist, album, artist_link, track_link, album_link;

  if (data.currently_playing_type === "episode") {
    image = track.images[0].url;
    artist = track.show.name;
  } else {
    image = track.album.images[0].url;
    artist = track.artists[0].name;
    album = track.album.name;
    artist_link = track.artists[0].external_urls.spotify;
    track_link = track.external_urls.spotify;
    album_link = track.album.external_urls.spotify;
  }

  const toggleEmbed = () => setEmbedVisibility(!isEmbedVisible);

  return (
    <div ref={spotifyRef} style={style} className={styles.spotify}>
      <div>
        <span className={styles.header}>
          {data.track ? "John last listened to" : "John's listening to"}
        </span>
      </div>

      <div className={styles.details_container}>
        <div className={styles.artwork_wrapper}>
          <img src={image} className={styles.artwork} alt="artwork" />
        </div>
        <div className={styles.details_wrapper}>
          <p className={styles.track_title}>
            <a href={track_link} rel="noreferrer noopener" target="_blank">
              {title}
            </a>
          </p>
          <p className={styles.track_artist}>
            by{" "}
            <a href={artist_link} rel="noreferrer noopener" target="_blank">
              {artist}
            </a>
          </p>
          {album && (
            <p className={styles.track_album}>
              on{" "}
              <a href={album_link} rel="noreferrer noopener" target="_blank">
                {album}
              </a>
            </p>
          )}
        </div>
      </div>

      <div
        style={{ display: `${isEmbedVisible ? "inline-block" : "none"}` }}
        className={styles.spotify_embed}
      >
        <iframe
          className={styles.spotify_embed}
          src={`https://open.spotify.com/embed/${type}/${track.id}`}
          width="100%"
          height={type === "episode" ? "152px" : "80px"}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>

      <div onClick={toggleEmbed} className={styles.more}>
        <DownArrow
          style={{
            transform: `${isEmbedVisible ? "rotate(180deg)" : "rotate(0deg)"}`,
          }}
        />
      </div>
    </div>
  );
};

export default index;
