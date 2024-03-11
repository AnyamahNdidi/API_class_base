import { config } from "dotenv"
//NODE_ENV is being pass on the dev and start script on the package.json file
config({ path: `.env.${process.env.NODE_ENV}.local` })
export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {NODE_ENV, PORT, DB_HOST, DB_PORT, DB_NAME} = process.env