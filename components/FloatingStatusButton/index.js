import styles from "./floating_status_button.module.scss";
import { HeadphoneIcon, HoverIcon, ClapperBoardIcon } from "../../utils/svgs";

const FloatingStatusButton = ({ music_action, media_action }) => {
  return (
    <div className={styles.floating_container}>
      <div
        onClick={music_action}
        className={`${styles.floating_button_hidden} ${styles.music_button}`}
      >
        <HeadphoneIcon />
      </div>
      <div
        onClick={media_action}
        className={`${styles.floating_button_hidden} ${styles.media_button}`}
      >
        <ClapperBoardIcon />
      </div>
      <div className={styles.floating_button}>
        <HoverIcon />
      </div>
    </div>
  );
};

export default FloatingStatusButton;
