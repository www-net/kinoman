import Card from './card';
import ShowMore from './show-more';

export default class FilmsList {
  constructor({type, title, quantity}) {
    this.type = type;
    this.title = title;
    this.quantity = quantity;
    this.className = `films-list`;
  }

  getCards() {
    let cardsMarkup = ``;

    for (let i = 0; i < this.quantity; i++) {
      // Предполагается, что у каждой карточки
      // будет своё содержимое, и в конструктор
      // будет подаваться объект с данными
      const card = new Card();

      cardsMarkup += card.getTmpl();
    }

    return cardsMarkup;
  }

  getShowMore() {
    // По-хорошему, тут должно проверяться
    // количество выводимых карточек, а не тип
    if (this.type !== `upcoming`) {
      return ``;
    }

    const showMore = new ShowMore();
    return showMore.getTmpl();
  }

  getClassName() {
    const classList = [this.className];

    if (this.type !== `upcoming`) {
      classList.push(`${this.className}--${this.type}`);
    }

    return classList.join(` `);
  }

  getTitle() {
    const classList = [`films-list__title`];

    if (this.type === `upcoming`) {
      classList.push(` visually-hidden`);
    }

    return (
      `<h2 class="${classList.join(` `)}">
        ${this.title}
      </h2>`
    );
  }

  getTmpl() {
    const className = this.getClassName();
    const title = this.getTitle();
    const cards = this.getCards();
    const showMore = this.getShowMore();

    return (`
      <section class="${className}">
        ${title}
        <div class="films-list__container">
          ${cards}
        </div>
        ${showMore}
      </section>
    `);
  }
}
