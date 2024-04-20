import {createElement} from '../helpers';

export default class Profile {
  constructor({status, avatar}) {
    this._status = status;
    this._avatar = avatar;
  }

  _getTmpl() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._status}</p>
        <img
          class="profile__avatar"
          src="images/${this._avatar}"
          alt="Avatar"
          width="35" height="35">
      </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTmpl());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
