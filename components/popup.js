import { playAlert, playMouse, playWin } from './sound.js';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpBtn = document.querySelector('.pop-up__btn');
    this.popUpBtn.addEventListener('click', () => {
      this.clickListener && this.clickListener();
      this.hide();
    });
  }

  setOnClickListener(clickListener) {
    this.clickListener = clickListener;
  }

  showWidthText(status) {
    this.popUp.classList.add('visible');
    let message;
    switch (status) {
      case 'win':
        message = 'YOU WON 🎉';
        playWin();
        break;
      case 'lose':
        message = 'YOU LOST 💩';
        playMouse();
        break;
      case 'cancle':
        message = 'REPLAY ❓';
        playAlert();
        break;
      default:
        throw new Error(`not valid '${status}'`);
    }
    this.popUpMessage.textContent = message;
  }

  hide() {
    this.popUp.classList.remove('visible');
  }
}
