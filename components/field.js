export default class Field {
  #cheese;
  #mouse;
  #field;
  #fieldRect;

  constructor(cheese, mouse) {
    this.#cheese = cheese;
    this.#mouse = mouse;
    this.#field = document.querySelector('.game__field');
    this.#fieldRect = this.#field.getBoundingClientRect();
    this.#field.addEventListener('click', (e) => {
      this.clickListener && this.clickListener(e);
    });
  }

  setOnClickListener(clickListener) {
    this.clickListener = clickListener;
  }

  init() {
    this.#field.innerHTML = '';
    this.#addItem(this.#cheese);
    this.#addItem(this.#mouse);
  }

  #addItem(item) {
    const { className, count, imgPath, size } = item;

    const x1 = 0;
    const y1 = 0;
    const x2 = this.#fieldRect.width - size;
    const y2 = this.#fieldRect.height - size;

    for (let i = 0; i < count; i++) {
      const template = document.createElement('template');
      template.innerHTML = `<img class=${className} src=${imgPath} alt=${className} />`;

      const gameItem = template.content.firstElementChild;
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      gameItem.style.left = `${x}px`;
      gameItem.style.top = `${y}px`;

      this.#field.appendChild(gameItem);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
