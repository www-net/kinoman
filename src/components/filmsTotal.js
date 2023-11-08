import {createElement, getPlurals} from '../helpers';

export default class FilmsTotal {
  constructor(counter) {
    this.counter = counter;
  }
  getElement() {
    const movieText = getPlurals(this.counter, [`movie`, `movies`]);
    const markup = `<section class="footer__statistics">
    <p>${this.counter} ${movieText} inside</p>
  </section>`;

    return createElement(markup);
  }
}
