const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /gtas should return a list of gta characters', async () => {
    const resp = await request(app).get('/gtas');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        first_name: 'Michael',
        last_name: 'De Santa',
        occupation: 'Former bank robber',
      },
      {
        id: '2',
        first_name: 'Franklin',
        last_name: 'Clinton',
        occupation: 'Gang member, Repo man',
      },
      {
        id: '3',
        first_name: 'Trevor',
        last_name: 'Philips',
        occupation: 'Drug addict, Former airman',
      },
      {
        id: '4',
        first_name: 'Lamar',
        last_name: 'Davis',
        occupation: 'Deluxe Premium Motorsport Employee',
      },
    ]);
  });
  it('#GET gtas/:id should return a single gta character', async () => {
    const resp = await request(app).get('/gtas/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      first_name: 'Franklin',
      last_name: 'Clinton',
      occupation: 'Gang member, Repo man',
    });
  });
  it('#POST /gtas should create a new gta character', async () => {
    const newGta = {
      first_name: 'Lester',
      last_name: 'Crest',
      occupation: 'Technology and computer expert/ experienced robber',
    };
    const resp = await request(app).post('/gtas').send(newGta);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newGta,
    });
  });
  it('#PUT /gtas/:id should update an existing gta character', async () => {
    const resp = await request(app).put('/gtas/1').send({
      occupation: 'Retired alcoholic',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.occupation).toBe('Retired alcoholic');
  });
  afterAll(() => {
    pool.end();
  });
});
