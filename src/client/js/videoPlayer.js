const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreen = document.getElementById("fullScreen");
const fullScreenIcon = fullScreen.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const textarea = document.getElementById("textarea");
const addComment = document.getElementById("addComment");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
let videoPlayStatus = false;
let setVideoPlayStatus = false;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  if (video.muted) {
    muteBtnIcon.classList = "fas fa-volume-mute";
  } else if (!video.muted && volumeValue >= 0.5) {
    muteBtnIcon.classList = "fas fa-volume-up";
  } else if (!video.muted && volumeValue >= 0.1) {
    muteBtnIcon.classList = "fas fa-volume-down";
  }

  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;

  video.volume = value;
  volumeValue = value;

  if (video.volume >= 0.5) {
    muteBtnIcon.classList = "fas fa-volume-up";
  } else if (video.volume >= 0.1) {
    muteBtnIcon.classList = "fas fa-volume-down";
  } else if (video.volume <= 2.7755575615628914e-17) {
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
};

//미디어의 영상 시간 추출값을 변환
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

//미디어의 전체시간 추출
const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
  if (video.currentTime == video.totalTime) {
    console.log("hi");
  }
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = true;
  }
  video.pause();
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const handleKeyEvent = (e) => {
  if (video.volume >= 0.5) {
    muteBtnIcon.classList = "fas fa-volume-up";
  } else if (video.volume >= 0.1) {
    muteBtnIcon.classList = "fas fa-volume-down";
  } else if (video.volume <= 2.7755575615628914e-17) {
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
  playBtnIcon.classList = "fa-solid fa-rotate-right";
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

const handleEnter = (event) => {
  if (event.key === "Enter" || event.code === 13) {
    event.preventDefault();
    addComment.click();
  }
};

document.addEventListener("keypress", (event) => {
  if (event.target.id !== "textarea") {
    event.preventDefault();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code == "Space" && event.target.id !== "textarea") {
    handlePlayClick();
    handleMouseMove();
  }
  if (
    (event.key == "m" || event.key == "M") &&
    event.target.id !== "textarea"
  ) {
    handleMute();
  }
  if (
    (event.key == "f" || event.key == "F") &&
    event.target.id !== "textarea"
  ) {
    handleFullScreen();
  }
  if (event.code == "ArrowRight" && event.target.id !== "textarea") {
    video.currentTime += 5;
    handleMouseMove();
  }
  if (event.code == "ArrowLeft" && event.target.id !== "textarea") {
    video.currentTime -= 5;
    handleMouseMove();
  }
});

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimelineChange);
timeline.addEventListener("change", handleTimelineSet);
fullScreen.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", () => video.focus());
video.addEventListener("keydown", (e) => {
  handleKeyEvent(e);
});
textarea.addEventListener("keydown", handleEnter);
