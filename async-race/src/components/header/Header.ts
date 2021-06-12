import './header.scss';
import { createElem } from '../../shared/functions';
import { BaseComponent } from '../BaseComponent';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    const toGarageButton = createElem('button', 'green-btn', 'to garage');
    const toWinnersButton = createElem('button', 'green-btn', 'to winners');
    this.element.append(toGarageButton, toWinnersButton);
  }
}
