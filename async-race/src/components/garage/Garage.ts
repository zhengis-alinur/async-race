import { createCar, getCars, startCar, updateCar } from '../../api';
import { createElem } from '../../shared/functions';
import { BaseComponent } from '../BaseComponent';
import { Car } from '../car/Car';
import './garage.scss';

export class Garage extends BaseComponent {
  public page = 1;

  private cars: { name: string, color: string, id: number }[] = [{ name: '', color: '', id: 0 }];

  public carElements: Car[] = [new Car('', '', 0)];

  public updateBtn?: HTMLElement;

  private selectedCarId = 0;

  carTable: HTMLElement = createElem('div', 'car-table', '');

  carForm: HTMLElement = createElem('div', 'car-form', '');

  constructor() {
    super('div', ['garage']);
    this.createCarForm();
    this.createCarTable();
    const buttons = createElem('div', 'garage-page-btns', '');
    const prevButton = createElem('button', 'green-btn', 'prev');
    const nextButton = createElem('button', 'green-btn', 'next');
    buttons.append(prevButton, nextButton);
    this.element.append(this.carForm, this.carTable, buttons);
    prevButton.addEventListener('click', () => {
      if (this.page !== 1) {
        this.displayCars(this.page - 1, 7);
        this.page--;
      }
    });
    nextButton.addEventListener('click', () => {
      this.displayCars(this.page + 1, 7);
      this.page++;
    });
  }

  async displayCars(page: number, limit: number) {
    this.carTable.innerHTML = '';
    const items = await getCars(page, limit).then((val) => {
      this.cars = val.items;
    });
    this.cars.forEach((val) => {
      const car = new Car(val.name, val.color, val.id);
      this.carElements.push(car);
      this.carTable.append(car.element);
    });
  }

  createCarForm() {
    const createForm = createElem('form', 'create-form', `
      <input type="text" id="create-input" name="name">
      <input type="color" id="create-car-color" name="color">
    `);
    const createBtn = createElem('button', 'blue-btn', 'create');
    createForm.append(createBtn);
    createBtn.addEventListener('click', () => {
      const name = (<HTMLInputElement>document.querySelector('#create-input')).value;
      const color = (<HTMLInputElement>document.querySelector('#create-car-color')).value;
      const newCar = { name, color };
      console.log(newCar);
      createCar(newCar);
    });

    const updateForm = createElem('form', 'update-form', `
      <input type="text" id="update-input" name="update-car">
      <input type="color" id="update-car-color" name="color">
    `);
    this.updateBtn = createElem('button', 'blue-btn', 'update');
    this.updateBtn.setAttribute('disabled', 'true');
    this.updateBtn.addEventListener('click', () => {
      const name = (<HTMLInputElement>document.querySelector('#update-input')).value;
      const color = (<HTMLInputElement>document.querySelector('#update-car-color')).value;
      const newCar = { name, color };
      updateCar(this.selectedCarId, newCar);
    });
    document.body.addEventListener('carSelected', (event) => {
      if (this.updateBtn) {
        this.updateBtn.removeAttribute('disabled');
        this.selectedCarId = (<CustomEvent>event).detail.id;
      }
    });
    updateForm.append(this.updateBtn);
    const btns = createElem('div', 'race-btns', '');
    const raceButton = createElem('button', 'race-btn', 'race');
    raceButton.addEventListener('click', () => {
      this.raceAllCars();
    });
    const resetButton = createElem('button', 'reset-btn', 'reset');
    const generateButton = createElem('button', 'generate-btn', 'generate');
    btns.append(raceButton, resetButton, generateButton);
    this.carForm.append(createForm, updateForm, btns);
  }

  createCarTable() {
    this.displayCars(1, 7);
  }

  raceAllCars() {
    this.carElements.forEach((val) => {
      val.startCar();
    });
  }
}
