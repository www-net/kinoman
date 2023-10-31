import {MAX_CARDS, MAX_CARDS_LOAD} from './const.js';

import Profile from './components/profile';
import Filter from './components/filter.js';
import Sort from './components/sort';
import Films from './components/films';
import Details from './components/details';
import Statistics from './components/statistics';

import {getCardsData} from './mocks/cards';

const cardsData = getCardsData(MAX_CARDS);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const siteFooterElem = document.querySelector(`.footer`);

const profile = new Profile();
const filter = new Filter();
const sort = new Sort();
const films = new Films(cardsData);
const details = new Details(cardsData[0]);
const statistics = new Statistics();

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(siteHeaderElem, profile.getTmpl());
render(siteMainElem, filter.getTmpl());
render(siteMainElem, sort.getTmpl());
render(siteMainElem, films.getTmpl());
render(siteFooterElem, statistics.getTmpl());
render(document.body, details.getTmpl());
