import AbstractComponent from './abstract-component';
import CardControls from './card-controls';
import Details from './details/index';
import {
  getRuntime,
  createElement,
  getPlurals,
  renderElement
} from '../helpers';

export default class Card extends AbstractComponent {

  constructor(data) {
    const {
      poster,
      title,
      shortDesc,
      genres,
      releaseDate,
      runtime,
      rating,
      comments,
    } = data;
    super();

    this._data = data;
    this._poster = poster;
    this._title = title;
    this._shortDesc = shortDesc;
    this._genre = genres[0];
    this._year = releaseDate.getFullYear();
    this._runtime = getRuntime(runtime);
    this._rating = rating;
    this._commentsCount = comments.length;

    this._cardControls = new CardControls(data);

    this._details = new Details(this._data);

    this._showDetails = this._showDetails.bind(this);
  }

  _addEvents(element) {
    const poster = element.querySelector(`.film-card__poster`);
    const title = element.querySelector(`.film-card__title`);
    const comments = element.querySelector(`.film-card__comments`);
    const controlsList = [poster, title, comments];

    for (const control of controlsList) {
      control.addEventListener(`click`, this._showDetails);
    }
  }

  _showDetails() {
    renderElement(document.body, this._details);
  }

  // Добавить множественное число комментариев в карточке
  _getCommentsLink() {
    const commentsText = getPlurals(this._commentsCount, [`comment`, `comments`]);

    return (
      `<a class="film-card__comments">${this._commentsCount} ${commentsText}</a>`
    );
  }

  // Шаблон карточки
  _getTmpl() {
    return (
      `<article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._runtime}</span>
          <span class="film-card__genre">${this._genre}</span>
        </p>
        <img
          src="./images/posters/${this._poster}"
          alt="The poster of the film '${this._title}'"
          class="film-card__poster">
        <p class="film-card__description">${this._shortDesc}</p>
        ${this._getCommentsLink()}
      </article>`
    );
  }

  _createElement() {
    const element = createElement(this._getTmpl());
    renderElement(element, this._cardControls);
    this._addEvents(element);

    return element;
  }
}
