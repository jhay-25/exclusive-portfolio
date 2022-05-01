import gsap from "gsap";

export const animateOpenMenu = (top, center, bottom) => {
  const menuTl = gsap.timeline({ duration: 0.1 });

  menuTl
    .to(
      center,
      {
        opacity: 0,
      },
      0
    )
    .to(
      top,
      {
        y: 9.5,
        rotate: 45,
        scaleX: 0.7,
      },
      0.2
    )
    .to(
      bottom,
      {
        y: -9.5,
        rotate: -45,
        scaleX: 0.7,
      },
      0.2
    );
};

export const animateCloseMenu = (top, center, bottom) => {
  const menuTl = gsap.timeline({ duration: 0.1 });
  menuTl
    .to(
      top,
      {
        y: 0,
        rotate: 0,
        scaleX: 1,
      },
      0
    )
    .to(
      bottom,
      {
        y: 0,
        rotate: 0,
        scaleX: 1,
      },
      0
    )
    .to(
      center,
      {
        opacity: 1,
      },
      0.2
    );
};

export const showMainMenu = (mainMenu) => {
  const menuTl = gsap.timeline({ duration: 0.1 });

  menuTl.to(mainMenu, {
    display: "block",
    opacity: 1,
  });
};

export const hideMainMenu = (mainMenu) => {
  const menuTl = gsap.timeline({ duration: 0.1 });
  menuTl.to(mainMenu, {
    display: "none",
    opacity: 0,
  });
};
