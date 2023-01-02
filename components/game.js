import Field from './field.js';
import PopUp from './popup.js';
import { playBackground, playCheese, stopBackground } from './sound.js';

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

export default class Game {
  #gameBtn;

  constructor() {
    this.gameDuration = 5;
    this.started = false;
    this.timer;
    this.score = 0;

    this.field = new Field(cheese, mouse);
    this.field.setOnClickListener(this.onItemClick);

    this.popUp = new PopUp();
    this.popUp.setOnClickListener(() => {
      this.start();
    });

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.#gameBtn = document.querySelector('.game__btn');
    this.#gameBtn.addEventListener('click', () => {
      if (!this.started) {
        this.start();
      } else {
        this.stop('cancle');
      }
    });
  }

  start() {
    this.started = true;
    this.init();
    this.#showStopBtn();
    this.showTimerAndScore();
    this.#startTimer();
    this.gameScore.textContent = cheese.count;
    playBackground();
  }

  stop(status) {
    this.started = false;
    clearInterval(this.timer);
    this.popUp.showWidthText(status);
    stopBackground();
  }

  init() {
    this.field.init();
    this.score = 0;
  }

  onItemClick = (e) => {
    if (!this.started) {
      return;
    }
    const target = e.target;
    if (target.matches('.cheese')) {
      playCheese();
      target.remove();
      this.score++;
      this.updateScore();
      if (this.score === cheese.count) {
        this.stop('win');
      }
    }
    if (target.matches('.mouse')) {
      this.stop('lose');
    }
  };

  updateScore() {
    this.gameScore.textContent = cheese.count - this.score;
  }

  #startTimer() {
    let time = this.gameDuration;
    this.#updateTimerText(time);
    this.timer = setInterval(() => {
      if (time === 0) {
        clearInterval(this.timer);
        this.stop(this.score === cheese ? 'win' : 'lose');
        return;
      }
      this.#updateTimerText(--time);
    }, 1000);
  }

  #updateTimerText(time) {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    this.gameTimer.textContent = `${min}:${sec}`;
  }

  showTimerAndScore() {
    this.gameTimer.classList.add('visible');
    this.gameScore.classList.add('visible');
  }

  #showStopBtn() {
    const icon = this.#gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }
}
