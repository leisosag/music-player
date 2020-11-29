const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const artista = document.getElementById("artist");
const cover = document.getElementById("cover");

const songs = [
  "Monstruo",
  "Therefore I am",
  "Positions",
  "Consequences",
  "Ho Hey",
  "Conversations in the dark",
];
const artists = [
  "Cami",
  "Billie Eilish",
  "Ariana Grande",
  "Camila Cabello",
  "The Lumineers",
  "John Legend",
];
let songIndex = 0;

const loadSong = (song, artist) => {
  title.innerText = song;
  artista.innerHTML = artist;
  audio.src = `./audio/${song}.mp3`;
  cover.src = `./img/${song}.jpg`;
};

loadSong(songs[songIndex], artists[songIndex]);

const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
};

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex], artists[songIndex]);
  playSong();
});

nextBtn.addEventListener(
  "click",
  (nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex], artists[songIndex]);
    playSong();
  })
);

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPerc = (currentTime / duration) * 100;
  progress.style.width = `${progressPerc}%`;
});

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
