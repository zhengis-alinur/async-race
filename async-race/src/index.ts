import { createCar, getCars } from './api';
import { Garage } from './components/garage/Garage';
import { Header } from './components/header/Header';
import { Winners } from './components/winners/Winners';
import { createElem } from './shared/functions';
import './styles.scss';

const garagePage = new Garage();
const winnersPage = new Winners();
const header = new Header();
const main = createElem('main', 'main', '');
const winnerTitle = createElem('p', 'winner-title', '');
header.toGarageButton.addEventListener('click', () => {
  garagePage.element.style.visibility = 'visible';
  winnersPage.element.style.visibility = 'hidden';
});
header.toWinnersButton.addEventListener('click', () => {
  garagePage.element.style.visibility = 'hidden';
  winnersPage.element.style.visibility = 'visible';
});
document.body.addEventListener('carFinish', () => {
  winnersPage.displayWinners(winnersPage.page, 10, 'time', 'ASC');
});
document.body.append(header.element);
main.append(garagePage.element, winnersPage.element, winnerTitle);
document.body.append(main);
