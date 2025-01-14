// import '@types/jest';
import request from 'supertest';
import { CreateUserDto } from '../dtos/users.dto';
import App from '../app';
import AuthRoutes from '../routes/auth.route';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Auth', () => {
  describe('[POST] /signup', () => {
    test('response should have the create user data', () => {
      const userData: CreateUserDto = {
        name: 'peter',
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoutes();
      const app = new App([]);

      return request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
    });
  });
});
