import FilmsListController from './films-list';
import {FilterType, FILTERS} from '../constants';

import {createElement, renderElement, getFilmsSortedByProp} from '../helpers';

import {MAX_CARDS_TOP, MAX_CARDS_SHOW, MAX_CARDS_LOAD, SortType} from '../constants';

export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._upcomingFilmsControllers = [];
    this._topRatedFilmsControllers = [];
    this._topCommentedFilmsControllers = [];
    this._shownQuantity = 0;
    this._currentFilter = ``;
    this._currentSort = ``;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._loadMoreUpcoming = this._loadMoreUpcoming.bind(this);

    this._filmsModel.addFilterChangeHandler(this._onFilterChange);
    this._filmsModel.addSortChangeHandler(this._onSortChange);
  }

  _getUpcoming(quantity = MAX_CARDS_LOAD) {
    const films = this._filmsModel.getFilms();
    const nextQuantity = this._shownQuantity + quantity;
    const cuttedFilms = films.slice(this._shownQuantity, nextQuantity);
    this._shownQuantity = nextQuantity;
    if (this._shownQuantity >= films.length) {
      this._upcomingListController.hideMoreBtn();
    } else {
      this._upcomingListController.showMoreBtn();
    }
    return cuttedFilms;
  }

  _getTopRated() {
    let films = getFilmsSortedByProp(this._filmsModel.getFilms(), SortType.RATING);
    films = films.slice(0, MAX_CARDS_TOP);
    return films;
  }

  _getTopCommented() {
    let films = getFilmsSortedByProp(this._filmsModel.getFilms(), SortType.COMMENTS);
    films = films.slice(0, MAX_CARDS_TOP);
    return films;
  }

  _initFilmsControllers(element) {
    this._upcomingListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        {type: `upcoming`, title: `All movies. Upcoming`}
    );
    this._upcomingListController.setMoreBtnClickHandler(this._loadMoreUpcoming);
    this._topRatedListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        {type: `extra`, title: `Top rated`}
    );
    this._topCommentedListController = new FilmsListController(
        element,
        this._onDataChange,
        this._onViewChange,
        {type: `extra`, title: `Top commented`}
    );
  }

  _collectAllFilmsControllers() {
    return [].concat(
        this._upcomingFilmsControllers,
        this._topRatedFilmsControllers,
        this._topCommentedFilmsControllers
    );
  }

  _removeUpcomingFilmsControllers() {
    this._upcomingFilmsControllers.forEach((item) => item.destroy());
    this._upcomingFilmsControllers = [];
  }

  _updateUpcoming(quantity) {

    this._shownQuantity = 0;

    const films = this._getUpcoming(quantity);
    this._removeUpcomingFilmsControllers();

    if (films.length === 0) {
      const filterName = FILTERS[this._filmsModel.getFilterType()].name;
      const message = `There are no movies for filter "${filterName}"`;
      this._upcomingListController.showNoFilmsMessage(message);
      return;
    }

    this._upcomingListController.hideNoFilmsMessage();

    this._upcomingFilmsControllers = this._upcomingListController.renderCards(films);

    this._allFilmsControllers = this._collectAllFilmsControllers();
  }

  _onSortChange() {
    this._updateUpcoming();
  }

  _onFilterChange() {
    this._updateUpcoming();
  }

  _loadMoreUpcoming() {
    const newCards = this._getUpcoming();
    const newControllers = this._upcomingListController.renderCards(newCards);
    this._upcomingFilmsControllers = this._upcomingFilmsControllers.concat(newControllers);
    this._allFilmsControllers = this._collectAllFilmsControllers();

    if (this._shownQuantity >= this._filmsModel.getFilms().length) {
      this._upcomingListController.hideMoreBtn();
    }
  }

  _checkIsNeedToUpdateFiltered(oldData, newData) {
    const currentFilter = this._filmsModel.getFilterType();

    if (currentFilter === FilterType.ALL) {
      return false;
    }

    const filterProp = FILTERS[currentFilter].prop;

    return oldData[filterProp] !== newData[filterProp]
      && newData[filterProp] === false;
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (!isSuccess) {
      return;
    }

    const isNeedToUpdateFiltered = this._checkIsNeedToUpdateFiltered(oldData, newData);
    const filmsControllersToUpdate = this._allFilmsControllers.filter((item) => item.filmData.id === oldData.id);

    if (filmsControllersToUpdate.length === 0) {
      return;
    }

    // Update all cards with film in all sections
    filmsControllersToUpdate.forEach((item) => {
      item.render(newData);
    });

    if (isNeedToUpdateFiltered) {
      this._updateUpcoming(this._upcomingFilmsControllers.length);
    }
  }

  _onViewChange() {
    this._allFilmsControllers.forEach((item) => item.setDefaultView());
  }

  render() {
    const films = this._filmsModel.getFilms();
    const filmsSection = createElement(`<section class="films"></section>`);
    this._initFilmsControllers(filmsSection);
    renderElement(this._container, filmsSection);

    if (films.length === 0) {
      this._upcomingListController.showNoFilmsMessage(`There are no movies in our database`);
      return;
    }

    this._upcomingFilmsControllers = this._upcomingListController.render(this._getUpcoming(MAX_CARDS_SHOW));

    if (films.length > MAX_CARDS_SHOW) {
      this._upcomingListController.showMoreBtn();
    }
    this._topRatedFilmsControllers = this._topRatedListController.render(this._getTopRated());
    this._topCommentedFilmsControllers = this._topCommentedListController.render(this._getTopCommented());
    this._allFilmsControllers = this._collectAllFilmsControllers();
  }
}
