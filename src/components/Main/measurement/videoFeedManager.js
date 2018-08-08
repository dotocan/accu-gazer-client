/* eslint-disable no-undef */
const width = 320;
const height = 240;
const topDist = "0px";
const leftDist = "0px";

const overlay = document.createElement("canvas");
const faceOverlay = document.createElement("face_overlay");

export const SetupVideoFeed = () => {
  //Set up video variable to store the camera feedback
  const video = document.getElementById("webgazerVideoFeed");

  //Position the camera feedback to the top left corner.
  video.style.display = "block";
  video.style.position = "fixed";
  video.style.top = topDist;
  video.style.left = leftDist;

  //Set up the video feedback box size
  video.width = width;
  video.height = height;
  video.style.margin = "0px";
  webgazer.params.imgWidth = width;
  webgazer.params.imgHeight = height;

  //Set up the overlay canvas
  overlay.id = "overlay";

  //Setup the size of overlay canvas
  overlay.style.position = "fixed";
  overlay.width = width;
  overlay.height = height;
  overlay.style.top = topDist;
  overlay.style.left = leftDist;
  overlay.style.margin = "0px";

  //Draw the face overlay on the camera video feedback
  faceOverlay.id = "faceOverlay";
  faceOverlay.style.position = "fixed";
  faceOverlay.style.top = "59px";
  faceOverlay.style.left = "107px";
  faceOverlay.style.border = "solid";

  document.body.appendChild(overlay);
  document.body.appendChild(faceOverlay);

  OverlayDrawLoop();
};

function OverlayDrawLoop() {
  const cl = webgazer.getTracker().clm;

  requestAnimFrame(OverlayDrawLoop);
  overlay.getContext("2d").clearRect(0, 0, width, height);
  if (cl.getCurrentPosition()) {
    cl.draw(overlay);
  }
};
