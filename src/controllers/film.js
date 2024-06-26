import CardComponent from '../components/card';
import DetailsComponent from '../components/details';
import {renderElement, removeElement, replaceElement} from '../helpers';
import {FilterType, FILTERS} from '../constants';

export default class FilmController {
  constructor(container, onDataChange, onViewChange, checkIsNeedToDestroyController, setOpenedFilmController) {
    this._container = container;

    this._cardComponent = null;
    this._detailsComponent = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._checkIsNeedToDestroyController = checkIsNeedToDestroyController;
    this._setOpenedFilmController = setOpenedFilmController;
    this._showDetails = this._showDetails.bind(this);
    this._hideDetails = this._hideDetails.bind(this);
    this._toggleProp = this._toggleProp.bind(this);
    this._updateComments = this._updateComments.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._detailsIsOpened = false;
  }

  setDefaultView() {
    this._hideDetails();
    this._detailsComponent.reset();
    this.detailsIsOpened = false;
  }

  destroy() {
    removeElement(this._cardComponent);
    this._detailsComponent.removeEvents();
    removeElement(this._detailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  removeCard() {
    removeElement(this._cardComponent);
  }

  _showDetails() {
    this._onViewChange();
    renderElement(document.body, this._detailsComponent);
    this._setDetailsHandlers();
    this.detailsIsOpened = true;
    this._setOpenedFilmController(this);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _hideDetails() {
    const isNeedToDestroy = this._checkIsNeedToDestroyController(this);

    if (isNeedToDestroy) {
      this.destroy();
    }

    this._detailsComponent.removeEvents();
    removeElement(this._detailsComponent);
    this.detailsIsOpened = false;
    this._setOpenedFilmController(null);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _setWatchedDate(prop, newFilmData) {
    const watchedPropName = FILTERS[FilterType.HISTORY].propName;
    const isDateNeeded = prop === watchedPropName
    && newFilmData[prop]
    && !newFilmData.watchedDate;

    if (isDateNeeded) {
    // Film was marked as watched but it has no date
      newFilmData.watchedDate = new Date();
    }
  }

  _toggleProp(prop) {
    const newFilmData = Object.assign(
        {},
        this.filmData,
        {[prop]: !this.filmData[prop]}
    );

    this._setWatchedDate(prop, newFilmData);
    this._onDataChange(this.filmData, newFilmData);
  }

  _updateComments(id, newData) {
    const comments = this.filmData.comments;
    let newComments = [];

    if (newData === null) {
      // deletion
      newComments = comments.filter((comment) => comment.id !== id);
    } else if (id === null) {
      newComments = comments.concat([newData]);
      this._detailsComponent.resetComment();
    }

    const newFilmData = Object.assign(
        {},
        this.filmData,
        {comments: newComments}
    );

    this._onDataChange(this.filmData, newFilmData);
  }

  _onEscKeyDown(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._hideDetails();
    }
  }

  _setCardHandlers() {
    this._cardComponent.setCardClickHandler(this._showDetails);
    this._cardComponent.setControlsClickHandler(this._toggleProp);
  }

  _setDetailsHandlers() {
    this._detailsComponent.setCloseBtnClickHandler(this._hideDetails);
    this._detailsComponent.setControlsClickHandler(this._toggleProp);
    this._detailsComponent.setCommentsActionsHandler(this._updateComments);
  }

  render(filmData) {
    this.filmData = filmData;
    const oldCardComponent = this._cardComponent;
    const oldDetailsComponent = this._detailsComponent;
    if (this._detailsComponent) {
      this._detailsComponent.removeEvents();
    }
    this._cardComponent = new CardComponent(filmData);
    this._detailsComponent = new DetailsComponent(filmData);

    this._setCardHandlers();

    if (oldCardComponent) {
      replaceElement(oldCardComponent, this._cardComponent);

      if (this.detailsIsOpened) {
        this._setDetailsHandlers();
        replaceElement(oldDetailsComponent, this._detailsComponent);
      }
    } else {
      renderElement(this._container, this._cardComponent);
    }
  }
}
