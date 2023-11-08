import {createElement} from '../helpers';

export default class FilmsTotal {
  constructor(counter) {
    this.counter = counter;
  }
  getElement() {
    const markup = `<section class="footer__statistics">
    <p>${this.counter} movies inside</p>
  </section>`;

    return createElement(markup);
  }
}
