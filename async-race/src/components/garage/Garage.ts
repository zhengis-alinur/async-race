import {
  createCar, createWinner, getCar, getCars, getWinner, startCar, updateCar, updateWinner,
} from '../../api';
import { createElem } from '../../shared/functions';
import { BaseComponent } from '../BaseComponent';
import { Car } from '../car/Car';
import './garage.scss';

export class Garage extends BaseComponent {
  public page = 1;

  private cars?: { name: string, color: string, id: number }[];

  public carElements?: Car[];

  public updateBtn?: HTMLElement;

  private selectedCarId = 0;

  carTable: HTMLElement = createElem('div', 'car-table', '');

  carForm: HTMLElement = createElem('div', 'car-form', '');

  raceButton = createElem('button', 'green-btn', 'race');

  resetButton = createElem('button', 'green-btn', 'reset');

  carsNum = createElem('div', 'cars-num', '');

  pageNum = createElem('div', 'page-num', '');

  winner?: number;

  raceStartTime?: Date;

  raceEndTime?: Date;

  constructor() {
    super('div', ['garage']);
    this.createCarForm();
    this.createCarTable();
    const buttons = createElem('div', 'garage-page-btns', '');
    const prevButton = createElem('button', 'green-btn', 'prev');
    const nextButton = createElem('button', 'green-btn', 'next');
    buttons.append(prevButton, nextButton);
    this.element.append(this.carForm, this.carsNum, this.pageNum, this.carTable, buttons);
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
    document.body.addEventListener('carFinish', async (e) => {
      if (!this.winner) {
        this.winner = (<CustomEvent> e).detail.id;
        this.raceEndTime = new Date();
        if (this.raceStartTime) {
          const time = this.raceEndTime.getTime() - this.raceStartTime.getTime();
          const { id } = (<CustomEvent> e).detail;
          const winner = {
            id: (<CustomEvent> e).detail.id,
            wins: 1,
            time: time / 1000,
          };
          const winnerTitle = document.querySelector('.winner-title');
          if (winnerTitle) {
            winnerTitle.innerHTML = `Winner is ${(<CustomEvent> e).detail.name} (${time / 1000}s)`;
            (<HTMLElement> winnerTitle).style.visibility = 'visible';
          }
          const resp = await createWinner(winner);
          if (resp.success === false) {
            let updateCarWins;
            await getWinner(id).then((val) => {
              updateCarWins = val[0].wins;
            });
            if (updateCarWins) {
              winner.wins = updateCarWins + 1;
            }
            await updateWinner(id, winner);
          }
        }
      }
    });
  }

  async displayCars(page: number, limit: number) {
    this.resetAllCars();
    this.carTable.innerHTML = '';
    await getCars(page, limit).then((val) => {
      this.cars = val.items;
      this.carsNum.innerHTML = `Garage(${val.count})`;
      this.pageNum.innerHTML = `Page #${page}`;
    });
    this.carElements = [new Car('', '', 0)];
    this.carElements.pop();
    if (this.cars) {
      this.cars.forEach((val) => {
        const car = new Car(val.name, val.color, val.id);
        if (this.carElements) {
          this.carElements.push(car);
        }
        this.carTable.append(car.element);
      });
    }
  }

  createCarForm() {
    const createForm = createElem('form', 'create-form', `
      <input type="text" id="create-input" name="create-car">
      <input type="color" id="create-car-color" name="color">
    `);
    const createBtn = createElem('button', 'blue-btn', 'create');
    createForm.append(createBtn);
    createBtn.addEventListener('click', () => {
      const name = (<HTMLInputElement>document.querySelector('#create-input')).value;
      const color = (<HTMLInputElement>document.querySelector('#create-car-color')).value;
      const newCar = { name, color };
      createCar(newCar);
    });

    const updateForm = createElem('form', 'update-form', `
      <input type="color" id="update-car-color" name="color">
    `);
    const updateInput = createElem('input', '', '');
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('id', 'update-input');
    updateForm.prepend(updateInput);
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
        (<HTMLInputElement>updateInput).value = (<CustomEvent>event).detail.name;
        this.updateBtn.removeAttribute('disabled');
        this.selectedCarId = (<CustomEvent>event).detail.id;
      }
    });
    document.body.addEventListener('carDeleted', () => {
      this.displayCars(this.page, 7);
    });
    updateForm.append(this.updateBtn);
    const btns = createElem('div', 'race-btns', '');
    this.raceButton.addEventListener('click', () => {
      this.raceAllCars();
    });
    this.resetButton.addEventListener('click', async () => {
      await this.resetAllCars();
      this.raceButton.removeAttribute('disabled');
      this.resetButton.setAttribute('disabled', 'true');
    });
    const generateButton = createElem('button', 'blue-btn', 'generate');
    generateButton.addEventListener('click', async () => {
      await this.generateCars();
    });
    btns.append(this.raceButton, this.resetButton, generateButton);
    this.carForm.append(createForm, updateForm, btns);
  }

  createCarTable():void {
    this.displayCars(1, 7);
  }

  async raceAllCars() {
    this.raceStartTime = new Date();
    this.resetButton.removeAttribute('disabled');
    this.raceButton.setAttribute('disabled', 'true');
    if (this.carElements) {
      this.carElements.forEach((val) => {
        val.startCar();
      });
    }
  }

  async resetAllCars() {
    const winnerTitle = document.querySelector('.winner-title');
    if (winnerTitle) {
      (<HTMLElement> winnerTitle).style.visibility = 'hidden';
    }
    if (this.winner) {
      this.winner = undefined;
    }
    if (this.carElements) {
      this.carElements.forEach((val) => {
        val.reset();
      });
    }
  }

  async generateCars() {
    const brands = ['BMW', 'Audi', 'Aston Martin', 'Mercedes', 'Lada', 'Land Rover', 'Toyota', 'Volvo', 'Tesla', 'Ssang yong', 'Ford', 'Porshe', 'Mazda', 'Nissan', 'Volkswagen'];
    const models = ['Mustang', '100', 'Niva', 'X-trail', 'Cayman', 'Range', 'Camry', '3', 'Prado', 'Cayenn', 'Explorer', '80', 'R8', 'GTR', 'Polo'];
    for (let i = 0; i < 100; i++) {
      const name = `${brands[Math.floor(Math.random() * brands.length)]} ${models[Math.floor(Math.random() * models.length)]}`;
      const letters = '0123456789abcdef';
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      const newCar = { name, color };
      createCar(newCar);
    }
    this.displayCars(this.page, 7);
  }
}
