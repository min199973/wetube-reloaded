/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\nconst playBtn = document.getElementById(\"play\");\nconst playBtnIcon = playBtn.querySelector(\"i\");\nconst muteBtn = document.getElementById(\"mute\");\nconst muteBtnIcon = muteBtn.querySelector(\"i\");\nconst volumeRange = document.getElementById(\"volume\");\nconst currenTime = document.getElementById(\"currenTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst timeline = document.getElementById(\"timeline\");\nconst fullScreenBtn = document.getElementById(\"fullScreen\");\nconst fullScreenIcon = fullScreenBtn.querySelector(\"i\");\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst videoControls = document.getElementById(\"videoControls\");\nlet controlsTimeout = null;\nlet controlsMovementTimeout = null;\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\nconst handlePlayClick = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n  playBtnIcon.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n};\nconst handleMuteClick = e => {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n  muteBtnIcon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\nconst handleVolumeChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n  volumeValue = value;\n  video.volume = value;\n};\nconst formatTime = seconds => new Date(seconds * 1000).toISOString().substr(14, 5);\nconst handleLoadedMetadata = () => {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\nconst handleTimeUpdate = () => {\n  currenTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\nconst handleTimelineChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  video.currentTime = value;\n};\nconst handleFullscreen = () => {\n  const fullscreen = document.fullscreenElement;\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenIcon.classList = \"fas fa-expand\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenIcon.classList = \"fas fa-compress\";\n  }\n};\nconst hideControls = () => videoControls.classList.remove(\"showing\");\nconst handleMouseMove = () => {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n  videoControls.classList.add(\"showing\");\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\nconst handleMouseLeave = () => {\n  controlsTimeout = setTimeout(hideControls, 3000);\n};\nconst handleKeydown = event => {\n  if (event.code === \"Space\") {\n    handlePlayClick();\n  }\n};\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadeddata\", handleLoadedMetadata);\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\nvideoContainer.addEventListener(\"mousemove\", handleMouseMove);\nvideoContainer.addEventListener(\"mouseleave\", handleMouseLeave);\ntimeline.addEventListener(\"input\", handleTimelineChange);\nfullScreenBtn.addEventListener(\"click\", handleFullscreen);\nvideo.addEventListener(\"click\", handlePlayClick);\ndocument.addEventListener(\"keydown\", event => {\n  if (event.code === \"Space\") {\n    handlePlayClick();\n    handleMouseMove();\n  }\n});\ndocument.addEventListener(\"keydown\", event => {\n  if (event.key === \"m\" || event.key === \"M\") {\n    handleMuteClick();\n    event.preventDefault();\n  }\n});\ndocument.addEventListener(\"keydown\", event => {\n  if (event.key === \"f\" || event.key === \"F\") {\n    handleFullscreen();\n    event.preventDefault();\n  }\n});\ndocument.addEventListener(\"keydown\", function (event) {\n  // 방향키 이벤트인 경우\n  if (event.keyCode >= 37 && event.keyCode <= 40) {\n    // 이벤트 기본 동작 취소\n    event.preventDefault();\n\n    // 현재 재생 위치 가져오기\n    var currentTime = video.currentTime;\n\n    // 방향키에 따라 재생 위치 이동시키기\n    switch (event.keyCode) {\n      case 37:\n        // 왼쪽 방향키\n        video.currentTime = currentTime - 5; // 5초 이전으로 이동\n        handleMouseMove();\n        break;\n      case 39:\n        // 오른쪽 방향키\n        video.currentTime = currentTime + 5; // 5초 이후로 이동\n        handleMouseMove();\n        break;\n    }\n  }\n});\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;