import { DB_HOST, DB_PORT, DB_NAME, NODE_ENV, DB_USER, DB_PASSWORD } from '../config';

export const dbConnect = {
  url:
    NODE_ENV === 'production'
      ? `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yiswx.mongodb.net/?retryWrites=true&w=majority`
      : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, // For development
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
