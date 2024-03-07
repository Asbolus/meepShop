import request from 'supertest';
import app from '../app';

describe('Banking App Integration Tests', () => {
  it('should create accounts and perform a transfer', async () => {
    const accountAResponse = await request(app)
      .post('/account')
      .send({ name: 'John Doe', balance: 1000 });
    expect(accountAResponse.statusCode).toBe(201);
    expect(accountAResponse.body.balance).toBe(1000);

    const accountBResponse = await request(app)
      .post('/account')
      .send({ name: 'Jane Doe', balance: 500 });
    expect(accountBResponse.statusCode).toBe(201);
    expect(accountBResponse.body.balance).toBe(500);

    const transferResponse = await request(app)
      .post('/transfer')
      .send({ fromAccountId: accountAResponse.body.id, toAccountId: accountBResponse.body.id, amount: 200 });
    expect(transferResponse.statusCode).toBe(200);

    const updatedAccountAResponse = await request(app).get(`/account/${accountAResponse.body.id}`);
    const updatedAccountBResponse = await request(app).get(`/account/${accountBResponse.body.id}`);
    expect(updatedAccountAResponse.body.balance).toBe(800);
    expect(updatedAccountBResponse.body.balance).toBe(700);
  });
});