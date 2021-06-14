import {
  deleteCar, driveCar, startCar, stopCar,
} from '../../api';
import { BaseComponent } from '../BaseComponent';
import { createElem, getPosition } from '../../shared/functions';
import './car.scss';

export class Car extends BaseComponent {
  name:string;

  color:string;

  id:number;

  carImg: HTMLElement;

  stopped = true;

  timer?: NodeJS.Timeout;

  ABtn = createElem('button', 'engine-btn', 'A');

  BBtn = createElem('button', 'engine-btn', 'B');

  constructor(name: string, color: string, id: number) {
    super('div', ['car']);
    this.name = name;
    this.color = color;
    this.id = id;
    this.carImg = createElem('div', 'car-img', `
    <svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="car-${this.id}"
      viewBox="70 75 123 123"
      height="36px"
      width="83px">
      <g
        transform="translate(-362.5464,-406.21469)"
        id="layer1">
        <path
          id="path4729-0-0"
          d="m 469.54633,480.16096 c -28.4885,-0.0451 -72.9963,4.7606 -72.9963,4.7606 0,0 6.1798,1.26482 4.9637,4.32757 -1.2162,3.06274 -12.9467,17.32041 -15.7822,19.34577 -1.6924,1.20893 -5.2585,1.62257 -7.8752,1.76616 0,0 -1.7042,1.94896 -2.5337,3.4482 -4.4252,7.99941 -3.7176,17.63218 -3.6889,16.15996 l -0.029,1.5351 c -6.6598,3.69009 -8.1038,5.47112 -8.6547,6.61849 -0.8478,1.76593 -0.2904,18.57192 1.0182,20.87321 0.9857,1.73392 7.9214,6.33244 11.2916,8.50164 -0.056,-0.70873 -0.092,-1.42082 -0.092,-2.13786 0,-7.17978 2.8263,-14.00249 7.9031,-19.07936 5.0769,-5.07684 11.8996,-7.90314 19.0794,-7.90314 7.1798,0 14.0025,2.8263 19.0793,7.90314 5.0769,5.07687 7.9029,11.89957 7.9029,19.07936 0,2.24289 -0.2752,4.45153 -0.8092,6.58241 l 0.5548,0.0361 120.8635,0 c -0.7721,-2.53009 -1.1733,-5.18506 -1.1733,-7.8912 0,-7.17954 2.826,-14.00226 7.9029,-19.07912 5.0768,-5.07686 11.8995,-7.90314 19.0793,-7.90314 7.18,0 14.0025,2.82628 19.0794,7.90314 5.0768,5.07686 7.9031,11.89958 7.9031,19.07912 0,2.55557 -0.364,5.06356 -1.0541,7.46584 5.0469,-0.7148 14.2719,-2.31369 15.0106,-4.57621 1.0187,-3.12 3.4004,-16.99581 1.0619,-24.52634 -2.3384,-7.53075 -12.7275,-20.74585 -51.6738,-29.01891 -44.8008,-25.45504 -63.7988,-31.06907 -89.3116,-32.92651 -3.1889,-0.23195 -2.9498,-0.33767 -7.0195,-0.34399 z m 1.7242,3.97119 c 6.6996,-0.0428 31.1274,0.62823 56.5514,14.15351 8.7451,4.65217 32.7782,16.49877 29.6553,19.0913 -12.726,10.56532 -21.7497,-3.30913 -85.7694,-5.09107 l -1.9091,-28.12782 c 0,0 0.5147,-0.0225 1.4718,-0.0248 z m -13.6445,0.21414 0,0 c 2.3774,-0.0293 3.8363,0 3.8363,0 l -0.891,27.61884 c 0,0 -53.8404,-1.39083 -55.3013,-2.99106 -1.4609,-1.60002 8.5016,-15.87798 20.6823,-20.49136 9.1355,-3.45971 24.5414,-4.05572 31.6737,-4.13822 z m 125.9029,37.15648 c 1.2019,-0.0225 2.4794,0.15328 2.8914,0.20063 2.5493,0.28852 11.4961,3.71849 17.0531,7.57695 5.5568,3.85848 9.3686,8.58706 9.3686,8.58706 -7.1911,2.09999 -31.9798,-14.08521 -31.7553,-15.46409 0.1127,-0.68934 1.24,-0.88657 2.4422,-0.90077 z m -24.6517,6.56462 9.4184,0 c 0,0 -0.6785,1.44064 -2.464,1.79973 -1.7855,0.35931 -2.8342,0.45646 -4.4903,0 -1.6564,-0.45625 -2.4641,-1.79973 -2.4641,-1.79973 z m 16.673,13.10937 c -6.0619,0 -11.9133,2.42348 -16.1998,6.71002 -4.2866,4.28631 -6.7096,10.13747 -6.7096,16.19963 0,6.06216 2.423,11.91332 6.7096,16.19986 4.2865,4.28632 10.1379,6.70978 16.1998,6.70978 6.0622,0 11.9134,-2.42346 16.1999,-6.70978 4.2865,-4.28654 6.7098,-10.1377 6.7098,-16.19986 0,-6.06216 -2.4233,-11.91332 -6.7098,-16.19963 -4.2865,-4.28654 -10.1377,-6.71002 -16.1999,-6.71002 z m -173.4002,1.27272 c -6.0621,0 -11.9133,2.42324 -16.1998,6.70999 -4.2866,4.28656 -6.7098,10.13748 -6.7098,16.19965 0,6.06215 2.4232,11.91332 6.7098,16.19986 4.2865,4.28654 10.1377,6.70978 16.1998,6.70978 6.0622,0 11.9133,-2.42324 16.1999,-6.70978 4.2865,-4.28654 6.7098,-10.13771 6.7098,-16.19986 0,-6.06217 -2.4233,-11.91309 -6.7098,-16.19965 -4.2866,-4.28675 -10.1377,-6.70999 -16.1999,-6.70999 z m 173.4002,8.9094 c 3.2679,0 6.6882,1.41811 8.9989,3.72864 2.3106,2.31074 3.7287,5.73124 3.7287,8.99889 0,3.26766 -1.4181,6.69017 -3.7287,9.0007 -2.3107,2.31076 -5.731,3.72683 -8.9989,3.72683 -3.2676,0 -6.6881,-1.41607 -8.9986,-3.72683 -2.3108,-2.31053 -3.7289,-5.73305 -3.7289,-9.0007 0,-3.26765 1.4181,-6.68815 3.7289,-8.99889 2.3105,-2.31053 5.731,-3.72864 8.9986,-3.72864 z m -173.4002,1.27271 c 3.2677,0 6.6882,1.4181 8.9987,3.72886 2.3107,2.31053 3.7288,5.73102 3.7288,8.99867 0,3.26788 -1.4181,6.69017 -3.7288,9.00091 -2.3105,2.31054 -5.731,3.72662 -8.9987,3.72662 -3.2676,0 -6.6881,-1.41608 -8.9989,-3.72662 -2.3105,-2.31074 -3.7286,-5.73303 -3.7286,-9.00091 0,-3.26765 1.4181,-6.68814 3.7286,-8.99868 2.3108,-2.31075 5.7313,-3.72885 8.9989,-3.72885 z"
          style="fill:${this.color};fill-opacity:0.99450983;stroke:none" />
      </g>
    </svg>
    `);
    const selectBtn = createElem('button', 'blue-btn', 'select');
    selectBtn.classList.add('select');
    selectBtn.addEventListener('click', () => {
      const carSelectedEvent = new CustomEvent('carSelected', {
        bubbles: true,
        detail: { id: this.id, name: this.name },
      });
      this.element.dispatchEvent(carSelectedEvent);
    });
    const removeBtn = createElem('button', 'blue-btn', 'remove');
    removeBtn.addEventListener('click', async () => {
      if (this.id) {
        await deleteCar(this.id);
        const carDeletedEvent = new CustomEvent('carDeleted', {
          bubbles: true,
        });
        this.element.dispatchEvent(carDeletedEvent);
      }
    });
    const carName = createElem('span', 'car-name', `${this.name}`);
    this.BBtn.setAttribute('disabled', 'true');

    this.ABtn.addEventListener('click', () => {
      this.startCar();
    });

    this.BBtn.addEventListener('click', async () => {
      if (this.id) {
        await this.reset();
        this.ABtn.removeAttribute('disabled');
        this.BBtn.setAttribute('disabled', 'true');
      }
    });
    const carEngineBtns = createElem('div', 'car-engine-btns', '');
    carEngineBtns.append(this.ABtn, this.BBtn);

    const carEngineShow = createElem('div', 'car-engine-show', '');
    carEngineShow.append(carEngineBtns, this.carImg);

    this.element.append(selectBtn, removeBtn, carName, carEngineShow);
  }

  getImg(): HTMLElement {
    return this.carImg;
  }

  race(velocity: number, distance: number):void {
    const carElem = document.getElementById(`car-${this.id}`);
    const shift = velocity / 16;
    let speed = shift;
    this.timer = setInterval(() => {
      if (this.stopped) {
        if (carElem !== null) {
          if (getPosition(carElem).left >= document.documentElement.clientWidth - 120) {
            this.stopped = false;
            const carFinish = new CustomEvent('carFinish', {
              bubbles: true,
              detail: { id: this.id, name: this.name },
            });
            this.element.dispatchEvent(carFinish);
          } else {
            (<HTMLElement>carElem).style.transform = `translateX(${speed}px)`;
            speed += shift;
          }
        }
      }
    }, 25);
  }

  async reset() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.stopped = true;
    await stopCar(this.id);
    const carElem = document.getElementById(`car-${this.id}`);
    if (carElem) {
      (<HTMLElement>carElem).style.transform = 'translateX(0)';
    }
    this.ABtn.removeAttribute('disabled');
    this.BBtn.setAttribute('disabled', 'true');
  }

  async startCar() {
    if (this.id) {
      let velocity = 0;
      let distance = 0;
      await startCar(this.id).then((resp) => {
        velocity = resp.velocity;
        distance = resp.distance;
      });
      this.BBtn.removeAttribute('disabled');
      this.ABtn.setAttribute('disabled', 'true');
      this.race(velocity, distance);
      const resp = await driveCar(this.id);
      if (resp.success === false) {
        this.stopped = false;
      }
    }
  }
}
