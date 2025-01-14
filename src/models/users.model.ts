import { model, Schema, Document } from 'mongoose';
('');
import { User } from '../interfaces/user.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const userModel = model<User & Document>('user', userSchema);

export default userModel;
