const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number) => (await fetch(`${garage}?id=${id}`)).json();

export const createCar = async (body: Record<string, unknown>) => (await fetch(garage, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const updateCar = async (id:number, body: Record<string, unknown>) => (await fetch(`${garage}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const deleteCar = async (id:number) => (await fetch(`${garage}/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const startCar = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`)).json();
// export const driveCar = async (id: number) => (await fetch(`${engine}?id=${id}&status=drive`)).json();
export const stopCar = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`)).json();
export const driveCar = async (id: number) => {
  const resp = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return resp.status !== 200 ? { success: false } : { ...{ await: resp.json() } };
};

export const getWinners = async (page: number, limit = 7, sort: string, order: string) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number) => (await fetch(`${winners}?id=${id}`)).json();

export const updateWinner = async (id:number, body: Record<string, unknown>) => (await fetch(`${winners}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const createWinner = async (body: Record<string, unknown>) => {
  const resp = await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch();
  return resp.status !== 201 ? { success: false } : { ...{ await: resp.json() } };
};
