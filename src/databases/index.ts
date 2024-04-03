import { DB_HOST, DB_PORT, DB_NAME } from '@config';

export const dbConnect = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
