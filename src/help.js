export function created(data) {
  const today = new Date().getTime();
  const dif = today - data;
  let age;
  if (dif >= 31556952000) {
    age = `<p>Fyrir ${Math.floor(dif / 31556952000)} árum síðan</p>`;
  } else if (dif >= 2629800000) {
    age = `<p>Fyrir ${Math.floor(dif / 2629800000)} mánuðum síðan</p>`;
  } else if (dif >= 604800000) {
    age = `<p>Fyrir ${Math.floor(dif / 604800000)} vikum síðan</p>`;
  } else if (dif >= 86400000) {
    age = `<p>Fyrir ${Math.floor(dif / 86400000)} dögum síðan</p>`;
  } else {
    age = `<p>Fyrir ${Math.floor(dif / 3600000)} klukkustundum síðan</p>`;
  }
  return age;
}

export function duration(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `<p>${minutes}:${seconds}</p>`;
}
