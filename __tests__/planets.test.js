const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /planets should return a list of planets', async () => {
    const resp = await request(app).get('/planets');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.arrayContaining([
      expect.objectContaining(
        {
          id: expect.any(String),
          name: expect.any(String),
          color: expect.any(String),
          sun: expect.any(String),
        }
      )
    ])
    );
  });
  it('#GET planets/:id should return a single planet', async () => {
    const resp = await request(app).get('/planets/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Venus',
      color: 'brown, grey',
      sun: 'second from the sun',
    });
  });
  it('#POST /planets should create a new planet', async () => {
    const newPlanet = {
      name: 'Niki',
      color: 'pink with sparkles',
      sun: 'the other side',
    };
    const resp = await request(app).post('/planets').send(newPlanet);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newPlanet,
    });
  });
  it('#PUT /planets/:id should update an existing planet', async () => {
    const resp = await request(app).put('/planets/1').send({
      color: 'pink, purple',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.color).toBe('pink, purple');
  });

  afterAll(() => {
    pool.end();
  });
});
