
export function created(data) {
    var today = new Date().getTime();
    var dif= today-data;
    console.log(today)
    if(dif>=31556952000){
        return `<p>Fyrir ${Math.floor(dif/31556952000)} árum síðan</p>`;
    } else if(dif>=2629800000) {
        return `<p>Fyrir ${Math.floor(dif/2629800000)} mánuðum síðan</p>`;
    } else if(dif>=604800000) {
        return `<p>Fyrir ${Math.floor(dif/604800000)} vikum síðan</p>`;
    } else if(dif>=86400000) {
        return `<p>Fyrir ${Math.floor(dif/86400000)} dögum síðan</p>`;
    } else {
        return `<p>Fyrir ${Math.floor(dif/3600000)} klukkustundum síðan</p>`;
    } 
}

export function duration(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    if(seconds<10) {
        seconds = `0${seconds}`;
    }
    return `<p>${minutes}:${seconds}</p>`;
}