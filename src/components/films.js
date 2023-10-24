import FilmsList from "./films-list";

// Кол-во карточек фильмов в основном списке
const QUANTITY_CARDS_UPCOMING = 5;
// Кол-во карточек фильмов в экстра списках
const QUANTITY_CARDS_TOP = 2;

// Данные для создания секций под фильмы
const filmsSectionsData = [
  {
    type: `upcoming`,
    title: `All movies. Upcoming`,
    quantity: QUANTITY_CARDS_UPCOMING
  },
  {
    type: `extra`,
    title: `Top rated`,
    quantity: QUANTITY_CARDS_TOP
  },
  {
    type: `extra`,
    title: `Most commented`,
    quantity: QUANTITY_CARDS_TOP
  }
];

// Создать списки фильмов
export default class Films {
  getTmpl() {
    const filmsSections = filmsSectionsData
      .reduce((prev, data) => {
        const filmsSection = new FilmsList(data);
        return prev + filmsSection.getTmpl();
      }, ``);

    return (
      `<section class="films">
        ${filmsSections}
      </section>
      `
    );
  }
}

