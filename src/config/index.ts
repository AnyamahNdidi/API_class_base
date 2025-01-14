import { config } from 'dotenv';
//NODE_ENV is being pass on the dev and start script on the package.json file
config({ path: `.env.${process.env.NODE_ENV}.local` });
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_NAME, LOG_DIR, LOG_FORMAT, SECRET_KEY, DB_USER, DB_PASSWORD } = process.env;
