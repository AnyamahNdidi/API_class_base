import { hash, compare } from 'bcrypt';
// import { sign } from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import userModel from '@/models/users.model';
import { isEmpty } from '@utils/util';
import { User } from '@interfaces/user.interface';
import { TokenData, DataStoredInToken } from '@interfaces/auth.interface';
import { MainAppError } from '@utils/errorDefinition';
import { HTTP } from '@interfaces/error.interface';
import { SECRET_KEY } from '@config';
import { sign } from 'jsonwebtoken';
// import { HttpException } from '@exceptions/HttpExpection';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData.email) || isEmpty(userData.password))
      throw new MainAppError({
        name: 'validationError',
        message: 'all field is required',
        status: HTTP.BAD_REQUEST,
        isSuccess: false,
      });

    const findUser: User | null = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new MainAppError({
        name: 'validationError',
        message: `this user ${userData.email} already exits`,
        status: HTTP.BAD_REQUEST,
        isSuccess: false,
      });

    const hashedPassword = await hash(userData.password, 10);
    const createUser: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUser;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData.email) || isEmpty(userData.password))
      throw new MainAppError({
        name: 'validationError',
        message: 'all field is required',
        status: HTTP.BAD_REQUEST,
        isSuccess: false,
      });

    const findUser: User | null = await this.users.findOne({ email: userData.email });
    if (!findUser)
      throw new MainAppError({
        name: 'user not there',
        message: `this ${userData.email} was not found`,
        status: HTTP.BAD_REQUEST,
        isSuccess: false,
      });

    const isMatchingPassword: boolean = await compare(userData.password, findUser.password);
    if (!isMatchingPassword)
      throw new MainAppError({
        name: ' Incorrect  Password',
        message: `password did not match`,
        status: HTTP.BAD_REQUEST,
        isSuccess: false,
      });

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookies(tokenData);
    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData.email) || isEmpty(userData.password))
      throw new MainAppError({
        name: 'validationError',
        message: 'all field is required',
        status: HTTP.BAD_REQUEST,
        isSuccess: false,
      });

    const findUser: User | null = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) {
      throw new MainAppError({
        name: 'validationError',
        message: `this ${userData.email} was not found`,
        status: HTTP.BAD_REQUEST,
        isSuccess: false,
      });
    }
    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey = SECRET_KEY as string;
    const expiresIn = 60 * 60;
    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookies(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthService;
