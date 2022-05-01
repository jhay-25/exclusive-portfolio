const msToTime = (duration) => {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  if (hours > 0) {
    hours = hours < 10 ? "0" + hours : hours;
    return hours + ":" + minutes + ":" + seconds;
  }

  return minutes + ":" + seconds;
};

export default {
  msToTime,
};
