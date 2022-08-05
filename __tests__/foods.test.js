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
  afterAll(() => {
    pool.end();
  });
});
