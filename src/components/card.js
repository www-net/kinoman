import {getClass, getRuntime, getFilmControlsData, createElement, getPlurals} from '../helpers';
import Details from './details';

export default class Card {

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
      isInWatchList,
      isWatched,
      isFavorite
    } = data;

    this._poster = poster;
    this._title = title;
    this._shortDesc = shortDesc;
    this._genre = genres[0];
    this._year = releaseDate.getFullYear();
    this._runtime = getRuntime(runtime);
    this._rating = rating;
    this._commentsCount = comments.length;

    // Данные для контролов карточки
    this._controlsData = getFilmControlsData({
      isInWatchList,
      isWatched,
      isFavorite,
    });

    this._element = createElement(this._getTmpl());


    this._showDetails = this._showDetails.bind(this);
    this._hideDetails = this._hideDetails.bind(this);

    data.hideDetails = this._hideDetails;
    const details = new Details(data);
    this._detailsElement = details.getElement();

    this._addEvents();
  }

  _addEvents() {
    const poster = this._element.querySelector(`.film-card__poster`);
    const title = this._element.querySelector(`.film-card__title`);
    const comments = this._element.querySelector(`.film-card__comments`);
    const elementsList = [poster, title, comments];

    for (let element of elementsList) {
      element.addEventListener(`click`, this._showDetails);
    }
  }

  _showDetails() {
    document.body.append(this._detailsElement);
  }

  _hideDetails() {
    this._detailsElement.remove();
  }

  // Создание контрола
  _getCardControl({id, text, isActive}) {
    const mods = [id];

    if (isActive) {
      mods.push(`active`);
    }

    const className = getClass({
      base: `film-card__controls-item`,
      mods
    });

    return (
      `<button class="${className}">${text}</button>`
    );
  }

  // Добавление контролов в форму карточки
  _getCardForm() {
    const controlsMarkup = this._controlsData
      .reduce((prev, control) => prev + this._getCardControl(control), ``);

    return (
      `<form class="film-card__controls">
        ${controlsMarkup}
      </form>`
    );
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
        ${this._getCardForm()}
      </article>`
    );
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
