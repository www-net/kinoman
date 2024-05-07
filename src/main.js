import FilmsModel from './models/films';

import FilterController from './controllers/filter';
import SortController from './controllers/sort';
import PageController from './controllers/page';

import Profile from './components/profile';
import FilmsTotal from './components/films-total.js';

import {renderElement} from './helpers';

import {TOTAL_FILMS} from './mocks/constants.js';
import {getCardsData} from './mocks/cards';
import {getUserData} from './mocks/user.js';

const filmsModel = new FilmsModel();
filmsModel.setFilms(getCardsData(TOTAL_FILMS));

const cardsData = filmsModel.getFilms();
const userData = getUserData(cardsData);

const siteHeaderElem = document.querySelector(`.header`);
const siteMainElem = document.querySelector(`.main`);
const filmsTotalElem = document.querySelector(`.footer__statistics`);

const filterController = new FilterController(siteMainElem, filmsModel);
const sortController = new SortController(siteMainElem, filmsModel);
const pageController = new PageController(siteMainElem, filmsModel);
const profile = new Profile(userData);
const filmsTotal = new FilmsTotal(cardsData.length);

renderElement(siteHeaderElem, profile);
filterController.render();
sortController.render();
pageController.render();

renderElement(filmsTotalElem, filmsTotal);

