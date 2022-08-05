const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /cities should return a list of cities', async () => {
    const resp = await request(app).get('/cities');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        city: 'Tokyo',
        country: 'Japan',
        population: '13,515,271',
      },
      {
        id: '2',
        city: 'Beijing',
        country: 'China',
        population: '21,893,095',
      },
      {
        id: '3',
        city: 'New York',
        country: 'United States',
        population: '8,804,190'
      },
      {
        id: '4',
        city: 'Paris',
        country: 'France',
        population: '2,148,271'
      },
    ]);
  });

  it('#GET cities/:id should return a single city', async () => {
    const resp = await request(app).get('/cities/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      city: 'Beijing',
      country: 'China',
      population: '21,893,095',
    });
  });

  it('#POST /cities should create a new city', async () => {
    const newCity = {
      city: 'Niki',
      country: 'United States',
      population: '1',
    };
    const resp = await request(app).post('/cities').send(newCity);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newCity,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
