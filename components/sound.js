const cheeseSound = new Audio('./sound/cheese_pull.mp3');
const mouseSound = new Audio('./sound/mouse_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCheese() {
  playSound(cheeseSound);
}

export function playMouse() {
  playSound(mouseSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playBackground() {
  playSound(bgSound);
}

export function playWin() {
  playSound(winSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.play();
  sound.currentTime = 0;
}

function stopSound(sound) {
  sound.pause();
}
