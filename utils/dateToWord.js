const months = [
  null,
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateToWord = (date) => {
  const [year, month, day] = date.split("-");

  if (month.startsWith("0")) {
    return `${months[month[1]]} ${day}, ${year}`;
  }

  return `${months[month]} ${day}, ${year}`;
};

export const dateToYear = (date) => {
  if (date) {
    const [year] = date.split("-");

    return year;
  }
  return null;
};
