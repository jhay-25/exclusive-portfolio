import gsap from "gsap";

export const close = (modal, modalColumn) => {
  gsap.to(modalColumn, { duration: 0, opacity: 0 });
  gsap.to(modal, { duration: 0.3, scale: 0 });
  gsap.to(modal, { delay: 0.3, display: "none" });
};

export const open = (modal, modalColumn) => {
  gsap.to(modal, { delay: 0.1, display: "flex" });
  gsap.to(modal, { duration: 0.5, scale: 1 });
  gsap.to(modalColumn, { duration: 0, opacity: 1, delay: 0.3 });
};
