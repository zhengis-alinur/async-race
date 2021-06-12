import './header.scss';
import { createElem } from '../../shared/functions';
import { BaseComponent } from '../BaseComponent';

export class Header extends BaseComponent {
  toGarageButton: HTMLElement = createElem('button', 'green-btn', 'to garage');

  toWinnersButton: HTMLElement = createElem('button', 'green-btn', 'to winners');

  constructor() {
    super('header', ['header']);
    this.element.append(this.toGarageButton, this.toWinnersButton);
  }
}
