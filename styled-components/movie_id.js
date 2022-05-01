import styled from "styled-components";

import theatre_img from "../public/assets/images/theatre.jpg";

export const Hero = styled.section`
  position: relative;
  height: 385px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${(props) =>
    props.backdrop
      ? `url(https://image.tmdb.org/t/p/w1280${props.backdrop})`
      : `url(${theatre_img})`};

  @media (min-width: 280px) and (max-width: 768px) {
    background-position: center !important;
  }

  @media (min-width: 768px) {
    height: 100vh;
    background-attachment: fixed;
  }
`;
