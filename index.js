const video = document.getElementById("js-video");
const canvas = document.getElementById("js-canvas");

let step;

const ctx = canvas.getContext("2d");

ctx.filter = "blur(1px)";

const draw = () => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
};

const drawLoop = () => {
  draw();
  step = window.requestAnimationFrame(drawLoop);
};

const drawPause = () => {
  window.cancelAnimationFrame(step);
  step = undefined;
};

const init = () => {
  video.addEventListener("loadeddata", draw, false);
  video.addEventListener("seeked", draw, false);
  video.addEventListener("play", drawLoop, false);
  video.addEventListener("pause", drawPause, false);
  video.addEventListener("ended", drawPause, false);
};

const cleanup = () => {
  video.removeEventListener("loadeddata", draw);
  video.removeEventListener("seeked", draw);
  video.removeEventListener("play", drawLoop);
  video.removeEventListener("pause", drawPause);
  video.removeEventListener("ended", drawPause);
};

window.addEventListener("load", init);
window.addEventListener("unload", cleanup);
