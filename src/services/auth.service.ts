import { hash } from 'bcrypt';
// import { sign } from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import userModel from '@/models/users.model';
import { isEmpty } from '@utils/util';
import { User } from '@interfaces/user.interface';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new Error('userData is empty');
    const findUser: any = await this.users.findOne({ email: userData.email });
    if (findUser) throw new Error(`this email ${userData.email} already exist`);
    const hashedPassword = await hash(userData.password, 10);
    const createUser: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUser;
  }
}

export default AuthService;
