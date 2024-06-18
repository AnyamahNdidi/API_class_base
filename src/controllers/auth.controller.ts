import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth.service';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/user.interface';

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
}

export default AuthController;
