import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/user.interface';

class AuthController {
  public authServices = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const userSignUp: User = await this.authServices.signup(userData);

      res.status(201).json({ data: userSignUp, message: 'user created' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authServices.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({
        message: 'login successfully',
        data: findUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // public logout = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userData: User = req.user as any;

  //     const logOutUserData: User = await this.authServices.logout(userData);
  //     res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
  //     res.status(200).json({
  //       data: logOutUserData,
  //       message: 'logout successfully',
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default AuthController;
