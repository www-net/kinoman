import Profile from './components/profile';
import Menu from './components/menu';
import Sort from './components/sort';
import FilmsList from './components/films-list';
import Details from './components/details';
import Statistics from './components/statistics';

// Кол-во карточек фильмов в основном списке
const QUANTITY_CARDS_UPCOMING = 5;
// Кол-во карточек фильмов в экстра списках
const QUANTITY_CARDS_TOP = 2;

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const siteFooterElem = document.querySelector(`.footer`);

const profile = new Profile();
const menu = new Menu();
const sort = new Sort();
const details = new Details();
const statistics = new Statistics();

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
const getFilmsTmpl = () => {
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
};

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(siteHeaderElem, profile.getTmpl());
render(siteMainElem, menu.getTmpl());
render(siteMainElem, sort.getTmpl());
render(siteMainElem, getFilmsTmpl());
render(siteFooterElem, statistics.getTmpl());
render(document.body, details.getTmpl());
