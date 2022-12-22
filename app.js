import Field from './components/field.js';

class App {
  constructor() {
    const filed = new Field();
    filed.addItem('cheese', 5, './img/cheese.png', 50);
    filed.addItem('mouse', 5, './img/mouse.png', 60);
  }
}

new App();
