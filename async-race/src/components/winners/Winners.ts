import { BaseComponent } from '../BaseComponent';

export class Winners extends BaseComponent {
  constructor() {
    super('div', ['winners-page']);
    this.element.style.visibility = 'hidden';
  }
}
