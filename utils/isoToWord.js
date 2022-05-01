export const isoToWord = (iso) => {
  if (iso) {
    const arr_date = new Date(iso).toString().split(" ");

    return `${arr_date[1]} ${arr_date[2]}`;
  }

  return null;
};
