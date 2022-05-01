import photosnap from "../public/assets/images/photosnap.jpg";
import creative_agency from "../public/assets/images/creative_agency.jpg";
import clock_app from "../public/assets/images/clock_app.jpg";
import ip_tracker from "../public/assets/images/ip_tracker.jpg";
import rest_api from "../public/assets/images/rest_api.jpg";

const projects = [
  {
    name: "Photosnap",
    image: `${photosnap}`,
    id: 1,
    link: "https://photosnap-omega.vercel.app/",
    desc: "Multipage marketing site for a photo-sharing app.",
  },
  {
    name: "Creative Agency",
    image: `${creative_agency}`,
    id: 2,
    link: "https://creative-agency-omega.vercel.app/",
    desc: "Product landing page.",
  },
  {
    name: "Clock App",
    image: `${clock_app}`,
    id: 3,
    link: "https://clock-app.thecodingjohn.vercel.app/",
    desc: "Application that make use of external APIs to set data based on a visitor's location.",
  },
  {
    name: "Ip Tracker",
    image: `${ip_tracker}`,
    id: 4,
    link: "https://ip-address-tracker-alpha.netlify.app/",
    desc: "IP address tracking application.",
  },
  {
    name: "Not existing na itooooo HAHA",
    image: `${rest_api}`,
    id: 5,
    link: "https://restcountries-api-jc.netlify.app/",
    desc: "Application integrated with the REST Countries API to pull country data and display it.",
  },
];

export default projects;
