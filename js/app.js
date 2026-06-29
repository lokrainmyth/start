const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const skipBtn = document.getElementById("skip");
const now = document.getElementById("now");
this.world = new IoWorld(this.player, this.storage);
this.world.init(this.tracks);

this.player.onTrackChange = null;
this.player.onFinish = null;

let tracks = [
"01-put.mp3",
"02-kofe-s-soboy.mp3",
"03-drug.mp3",
"04-nebo-temnoe.mp3",
"05-dogola.mp3",
"06-grustnaya-muzyka.mp3",
"07-dekabr.mp3",
"08-17.mp3",
"09-krasivo.mp3",
"10-rassvet.mp3"
];
this.world.init(this.tracks);
let index = 0;

function loadTrack(i){
audio.src = tracks[i];
audio.play();
now.innerText = (i+1) + " — PLAYING";
unlock(i);
updateDawn(i);
}

function unlock(i){
let els = document.querySelectorAll(".track");
if(els[i]) els[i].classList.remove("locked");
}

function updateDawn(i){
document.body.style.filter = `brightness(${0.6 + i*0.05})`;
}

playBtn.onclick = ()=>{
audio.play();
};

skipBtn.onclick = ()=>{
if(!confirm("The path remembers. Skip?")) return;
index++;
if(index < tracks.length){
loadTrack(index);
}
};

audio.onended = ()=>{
index++;
if(index < tracks.length){
loadTrack(index);
}
};

loadTrack(0);
