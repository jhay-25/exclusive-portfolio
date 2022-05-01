export const ratingToStar = (rating) => {
  switch (rating) {
    case 1:
      return "½";
    case 2:
      return "★";
    case 3:
      return "★½";
    case 4:
      return "★★";
    case 5:
      return "★★½";
    case 6:
      return "★★★";
    case 7:
      return "★★★½";
    case 8:
      return "★★★★";
    case 9:
      return "★★★★½";
    case 10:
      return "★★★★★";
    case null:
      return "";
  }
};
