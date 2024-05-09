import FilmController from './film';
import FilmsListComponent from '../components/films-list';
import ShowMoreBtn from '../components/show-more-btn';
import {renderElement, replaceElement} from '../helpers';


export default class FilmsListController {
  constructor(container, onDataChange, onViewChange, props) {
    this._container = container;
    this._props = props;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._moreBtn = new ShowMoreBtn();

    this._emptyFilmsComponent = new FilmsListComponent({type: `empty`});
    this._isFilmsMessageShown = false;
    this._openedID = null;

    this._setOpenedID = this._setOpenedID.bind(this);
  }

  setMoreBtnClickHandler(handler) {
    this._moreBtn.setClickHandler(handler);
  }

  hideMoreBtn() {
    this._moreBtn.hide();
  }

  showMoreBtn() {
    this._moreBtn.show();
  }

  _setOpenedID(id = null) {
    this._openedID = id;
  }

  renderCards(films) {
    return films.map((film) => {
      const filmController = new FilmController(
          this._filmsContainerElement,
          this._onDataChange,
          this._onViewChange,
          this._setOpenedID
      );

      filmController.render(film);

      if (this._openedID === film.id) {
        filmController._showDetails();
      }

      return filmController;
    });
  }

  showNoFilmsMessage(text) {
    this._emptyFilmsComponent.setTitle(text);
    this._isFilmsMessageShown = true;

    if (!this._filmsListComponent) {
      renderElement(this._container, this._emptyFilmsComponent);
      return;
    }

    replaceElement(this._emptyFilmsComponent, this._filmsListComponent);
    this._isFilmsMessageShown = false;
  }

  hideNoFilmsMessage() {
    if (!this._isFilmsMessageShown) {
      return;
    }
  }

  render(films) {
    this._filmsListComponent = new FilmsListComponent(this._props);
    this._filmsContainerElement = this._filmsListComponent.getFilmsContainerElement();

    renderElement(this._filmsListComponent.getElement(), this._moreBtn);
    renderElement(this._container, this._filmsListComponent);

    return this.renderCards(films);
  }
}
