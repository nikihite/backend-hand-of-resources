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
  afterAll(() => {
    pool.end();
  });
});
