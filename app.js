import Game from './components/game.js';

const Cheese = Object.freeze({
  className: 'cheese',
  count: 5,
  imgPath: './img/cheese.png',
  size: 50,
});

const Mouse = Object.freeze({
  className: 'mouse',
  count: 5,
  imgPath: './img/mouse.png',
  size: 60,
});

const GAME_DURATION = 5;

new Game(Cheese, Mouse, GAME_DURATION);
