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
export const stopCar = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`)).json();
