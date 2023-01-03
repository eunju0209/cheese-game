import Field from './field.js';
import PopUp from './popup.js';
import { playBackground, playCheese, stopBackground } from './sound.js';

export default class Game {
  #gameBtn;

  constructor(cheese, mouse) {
    this.cheese = cheese;
    this.mouse = mouse;

    this.gameDuration = 5;
    this.started = false;
    this.timer;
    this.score = 0;

    this.popUp = new PopUp();
    this.popUp.setOnRefreshListener(() => {
      this.start();
    });
    this.popUp.setOnLevelListener(() => {
      this.gameDuration += 1;
      this.cheese = { ...this.cheese, count: this.cheese.count + 2 };
      this.mouse = { ...this.mouse, count: this.mouse.count + 2 };
      this.field = new Field(this.cheese, this.mouse);
      this.start();
    });

    this.field = new Field(this.cheese, this.mouse);
    this.field.setOnClickListener(this.onItemClick);

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
    this.gameScore.textContent = this.cheese.count;
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
      if (this.score === this.cheese.count) {
        this.stop('win');
      }
    }
    if (target.matches('.mouse')) {
      this.stop('lose');
    }
  };

  updateScore() {
    this.gameScore.textContent = this.cheese.count - this.score;
  }

  #startTimer() {
    let time = this.gameDuration;
    this.#updateTimerText(time);
    this.timer = setInterval(() => {
      if (time === 0) {
        clearInterval(this.timer);
        this.stop(this.score === this.cheese.count ? 'win' : 'lose');
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
