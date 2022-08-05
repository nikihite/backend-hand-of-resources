const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /foods should return a list of foods', async () => {
    const resp = await request(app).get('/foods');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Carrot',
        color: 'orange',
        type: 'vegetable',
      },
      {
        id: '2',
        name: 'Apple',
        color: 'red',
        type: 'fruit',
      },
      {
        id: '3',
        name: 'Almond',
        color: 'brown',
        type: 'nut',
      },
      {
        id: '4',
        name: 'Mac n Cheese',
        color: 'yellow',
        type: 'pasta',
      },
    ]);
  });

  it('#GET foods/:id should return a single food', async () => {
    const resp = await request(app).get('/foods/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Apple',
      color: 'red',
      type: 'fruit',
    });
  });

  it('#GET foods/:id should return a single food', async () => {
    const resp = await request(app).get('/foods/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Apple',
      color: 'red',
      type: 'fruit',
    });
  });

  it('#POST /foods should create a new food', async () => {
    const newFood = {
      name: 'Strawberry',
      color: 'red',
      type: 'fruit',
    };
    const resp = await request(app).post('/foods').send(newFood);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newFood,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
