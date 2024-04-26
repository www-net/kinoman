import AbstractComponent from '../abstract-component';
import {EMOJIS} from '../../constants';

export default class EmojiControls extends AbstractComponent {
  _getClickHandler(handler) {
    return () => {
      const control = event.target.closest(`.film-details__emoji-item`);

      if (!control) {
        return;
      }

      handler(control.value);
    };
  }

  setClickHandler(handler) {
    const clickHandler = this._getClickHandler(handler);
    this.getElement().addEventListener(`click`, clickHandler);
  }

  _getEmojiControl(name) {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">
      <label class="film-details__emoji-label" for="emoji-${name}">
        <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji ${name}">
      </label>`
    );
  }
  _getTmpl() {
    const emojiControls = EMOJIS.reduce((prev, item) => {
      return prev + this._getEmojiControl(item);
    }, ``);
    return (
      `<div class="film-details__emoji-list">
        ${emojiControls}
      </div>`
    );
  }
}
