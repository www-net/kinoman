import {createElement} from '../helpers';

export default class FilmsTotal {
  constructor(counter) {
    this.counter = counter;
  }
  getElement() {
    return createElement(
      `<section class="footer__statistics">
        <p>${this.counter} movies inside</p>
      </section>`
    );
  }
}
