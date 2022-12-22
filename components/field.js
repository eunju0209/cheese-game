export default class Field {
  constructor() {
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
  }

  addItem(className, count, imgPath, size) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - size;
    const y2 = this.fieldRect.height - size;

    for (let i = 0; i < count; i++) {
      const template = document.createElement('template');
      template.innerHTML = `<img class=${className} src=${imgPath} alt=${className} />`;

      const item = template.content.firstElementChild;
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      this.field.appendChild(item);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
