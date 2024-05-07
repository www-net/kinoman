import AbstractComponent from './abstract-component';
import {getFilmsByFilter} from '../helpers';
import {FilterType, FILTERS} from '../constants';

const classes = {
  default: `main-navigation__item`,
  active: `main-navigation__item--active`
};

export default class Filter extends AbstractComponent {
  constructor(films, currentFilter) {
    super();

    this._films = films;
    this._defaultFilter = FilterType.ALL;
    this._currentFilter = currentFilter || this._defaultFilter;
  }

  setCurrentFilter(filter) {
    this._currentFilter = filter;
  }

  _createHandler(handler) {
    return (event) => {
      const control = event.target.closest(`.${classes.default}`);
      event.preventDefault();
      if (!control) {
        return;
      }

      const {filterProp} = control.dataset;
      if (filterProp === this._currentFilter) {
        return;
      }

      if (!this._currentControl) {
        this._currentControl = this.getElement().querySelector(`.${classes.active}`);
      }

      this._currentControl.classList.remove(classes.active);
      control.classList.add(classes.active);
      this._currentControl = control;
      this._currentFilter = filterProp;
      handler(filterProp);
    };
  }

  setClickHandler(handler) {
    this._clickHandler = this._createHandler(handler);
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _getItems() {
    return Object.entries(FILTERS).reduce((prev, [id, {name}]) => {
      let counter = 0;
      let counterMarkup = ``;
      let className = classes.default;
      className += ` ${classes.default}--${id}`;

      if (id !== FilterType.ALL) {
        counter = getFilmsByFilter(this._films, id).length;

        counterMarkup = `<span class="main-navigation__item-count">
          ${counter}
        </span>`;
      }

      if (id === this._currentFilter) {
        className += ` ${classes.active}`;
      }

      return (
        `${prev} <a href="#${id}" class="${className}" data-filter-prop="${id}">
          ${name} ${counterMarkup}
        </a>`
      );
    }, ``);
  }

  _getTmpl() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${this._getItems()}
        </div>
        <a href="#stats"
          class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }
}
