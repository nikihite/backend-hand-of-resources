const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /shapes should return a list of shapes', async () => {
    const resp = await request(app).get('/shapes');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Triangle',
        sides: '3',
      },
      {
        id: '2',
        name: 'Pentagon',
        sides: '5',
      },
      {
        id: '3',
        name: 'Square',
        sides: '4',
      },
      {
        id: '4',
        name: 'Hexagon',
        sides: '6',
      },
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});
