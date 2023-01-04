import { playAlert, playMouse, playWin } from './sound.js';

export const Status = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancle: 'cancle',
});

export default class PopUp {
  #popUp;
  #popUpMessage;
  #popUpRefresh;
  #popUpLevel;
  #levelListener;
  #refreshListener;

  constructor() {
    this.#popUp = document.querySelector('.pop-up');
    this.#popUpMessage = document.querySelector('.pop-up__message');
    this.#popUpRefresh = document.querySelector('.pop-up__refresh');
    this.#popUpRefresh.addEventListener('click', () => {
      this.#refreshListener && this.#refreshListener();
      this.#hide();
    });
    this.#popUpLevel = document.querySelector('.pop-up__level');
    this.#popUpLevel.addEventListener('click', () => {
      this.#levelListener && this.#levelListener();
      this.#hide();
    });
  }

  setOnLevelListener(levelListener) {
    this.#levelListener = levelListener;
  }

  setOnRefreshListener(refreshListener) {
    this.#refreshListener = refreshListener;
  }

  showWidthText(status) {
    this.#popUp.classList.add('visible');
    let message;
    switch (status) {
      case Status.win:
        message = 'YOU WON 🎉';
        this.#showLevelBtn();
        playWin();
        break;
      case Status.lose:
        message = 'YOU LOST 💩';
        this.#showRefreshBtn();
        playMouse();
        break;
      case Status.cancle:
        message = 'REPLAY ❓';
        this.#showRefreshBtn();
        playAlert();
        break;
      default:
        throw new Error(`not valid '${status}'`);
    }
    this.#popUpMessage.textContent = message;
  }

  #hide() {
    this.#popUp.classList.remove('visible');
  }

  #showRefreshBtn() {
    this.#popUpRefresh.classList.add('visible');
    this.#popUpLevel.classList.remove('visible');
  }

  #showLevelBtn() {
    this.#popUpLevel.classList.add('visible');
    this.#popUpRefresh.classList.remove('visible');
  }
}
