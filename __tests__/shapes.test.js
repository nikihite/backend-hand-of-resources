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

  it('#GET sodas/:id should return a single soda', async () => {
    const resp = await request(app).get('/shapes/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Pentagon',
      sides: '5',
    });
  });

  it('#POST /shapes should create a new shape', async () => {
    const newShape = {
      name: 'Octagon',
      sides: '8',
    };
    const resp = await request(app).post('/shapes').send(newShape);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newShape,
    });
  });

  it('#PUT /shapes/:id should update an existing shape', async () => {
    const resp = await request(app).put('/shapes/1').send({
      sides: '0',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.sides).toBe('0');
  });

  it('#DELETE /shapes/:id should delete a shape', async () => {
    const resp = await request(app).delete('/shapes/1');
    expect(resp.status).toBe(200);

    const shapeResp = await request(app).get('/shapes/1');
    expect(shapeResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
