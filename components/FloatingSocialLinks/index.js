import styles from "./floating_social_links.module.scss";
import {
  FreecodecampIcon,
  GithubIcon,
  LastFMIcon,
  CodepenIcon,
} from "../FloatingSocialLinks/icon";

const FloatingSocialLinks = () => {
  return (
    <div className={styles.social_links_wrapper}>
      <a
        className={styles.social_link}
        href="https://github.com/theCodingJohn"
        target="_blank"
        rel="noreferrer noopener"
      >
        <GithubIcon />
      </a>
      <a
        className={styles.social_link}
        href="https://codepen.io/jccnnn"
        target="_blank"
        rel="noreferrer noopener"
      >
        <CodepenIcon />
      </a>
      <a
        className={styles.social_link}
        href="https://forum.freecodecamp.org/u/Jccnnn/summary"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FreecodecampIcon />
      </a>
      <a
        className={styles.social_link}
        href="https://www.last.fm/user/Pectoralz"
        target="_blank"
        rel="noreferrer noopener"
      >
        <LastFMIcon />
      </a>
    </div>
  );
};

export default FloatingSocialLinks;
