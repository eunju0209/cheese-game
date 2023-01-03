import Game from './components/game.js';

class App {
  constructor() {
    const cheese = {
      className: 'cheese',
      count: 5,
      imgPath: './img/cheese.png',
      size: 50,
    };

    const mouse = {
      className: 'mouse',
      count: 5,
      imgPath: './img/mouse.png',
      size: 60,
    };
    new Game(cheese, mouse);
  }
}

new App();
