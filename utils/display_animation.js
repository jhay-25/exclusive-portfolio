import gsap from "gsap";

const hide = (target) => {
  const tl = gsap.timeline();

  tl.to(target, { duration: 0.3, ease: "ease", opacity: 0 }).to(target, {
    duration: 0,
    ease: "ease",
    display: "none",
    delay: 0.1,
  });
};

const showFlex = (target) => {
  const tl = gsap.timeline();

  tl.to(target, { duration: 0.1, ease: "ease", display: "flex" }).to(target, {
    duration: 0.1,
    opacity: 1,
    delay: 0.1,
    ease: "ease",
  });
};

const showBlock = (target) => {
  const tl = gsap.timeline();

  tl.to(target, { duration: 0.1, display: "block" }).to(target, {
    duration: 0.1,
    opacity: 1,
    delay: 0.1,
  });
};

export default {
  showBlock,
  showFlex,
  hide,
};
