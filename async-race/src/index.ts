import { createCar, getCars } from './api';
import { Garage } from './components/garage/Garage';
import { Header } from './components/header/Header';
import './styles.scss';

const header = new Header();
document.body.append(header.element);
const garagePage = new Garage();
document.body.append(garagePage.element);
