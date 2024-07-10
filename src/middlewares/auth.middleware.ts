import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { MainAppError } from '@utils/errorDefinition';
import { HTTP } from '@interfaces/error.interface';
import userModel from '@/models/users.model';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    // const Authorizations = req.cookies['Authorization'];
    const Authorizations = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization')?.split('Bearer ')[1] : null);
    // const Authorization = req.cookies;

    if (Authorizations) {
      const secretKey: string = SECRET_KEY as string;
      const verificationResponse = (await verify(Authorizations, secretKey)) as DataStoredInToken;

      const userId = verificationResponse._id;

      const findUser = await userModel.findById(userId);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(
          new MainAppError({
            name: 'AuthenticationError',
            message: 'Authentication token not found',
            status: HTTP.UNAUTHORIZED,
            isSuccess: false,
          })
        );
      }
    } else {
      next(
        new MainAppError({
          name: 'validationError',
          message: `'Authentication token missing`,
          status: HTTP.UNAUTHORIZED,
          isSuccess: false,
        })
      );
    }
  } catch (error: any) {
    next(
      new MainAppError({
        name: 'Invalid Authentication Token',
        message: `The authentication token provided is invalid. Please provide a valid token. Error: ${error.message}`,
        status: HTTP.UNAUTHORIZED,
        isSuccess: false,
      })
    );
  }
};

export default authMiddleware;
