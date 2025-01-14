import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import AuthController from '../controllers/auth.controller';
// import authMiddleware from '../middlewares/auth.middleware';

class AuthRoutes implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, this.authController.signUp);
    this.router.post(`${this.path}login`, this.authController.login);
    // this.router.post(`${this.path}logout`,  this.authController.logout);
  }
}

export default AuthRoutes;
