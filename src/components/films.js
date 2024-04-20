import FilmsList from "./films-list";
import {MAX_CARDS_TOP} from "../constants";
import {createElement} from "../helpers";

// Создать списки фильмов
export default class Films {
  // принимает массив объектов с данными для генерации карточек
  constructor(data) {
    this.data = data;
    this.element = createElement(`<section class="films"></section>`);
    this.addSections();
  }

  getTopRated() {
    const films = this.data.slice();

    films.sort((a, b) => {
      return b.rating - a.rating;
    });

    return films.slice(0, MAX_CARDS_TOP);
  }

  getTopCommented() {
    const films = this.data.slice();

    films.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });

    return films.slice(0, MAX_CARDS_TOP);
  }

  // Данные для создания секций под фильмы
  getSectionsData() {
    return [
      {
        type: `upcoming`,
        title: `All movies. Upcoming`,
        films: this.data,
      },
      {
        type: `extra`,
        title: `Top rated`,
        films: this.getTopRated(),
      },
      {
        type: `extra`,
        title: `Most commented`,
        films: this.getTopCommented(),
      },
    ];
  }

  addSections() {
    for (const section of this.getSectionsData()) {
      const filmsSection = new FilmsList(section);
      this.element.append(filmsSection.getElement());
    }
  }

  getElement() {
    return this.element;
  }
}
