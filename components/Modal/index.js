import { useRef } from "react";

import styles from "./modal.module.scss";

import { CancelIcon, SettingsIcon } from "../../utils/svgs";
import { close, open } from "../../utils/modal_animation";

const Modal = ({ children, className, modalRef, columnRef }) => {
  return (
    <>
      <div ref={modalRef} className={`${styles.container}`}>
        <div className={styles.row}>
          <div ref={columnRef} className={`${styles.column} ${className}`}>
            <div
              onClick={() => close(modalRef.current, columnRef.current)}
              className={styles.cancel_icon_container}
            >
              <CancelIcon />
            </div>
            {children}
          </div>
        </div>
      </div>

      <div
        onClick={() => open(modalRef.current, columnRef.current)}
        className={styles.setting_icon_container}
      >
        <SettingsIcon />
      </div>
    </>
  );
};

export default Modal;
