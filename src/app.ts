import express, { Application } from 'express';
import { PORT, NODE_ENV } from '@config';
import morgan from 'morgan';
import { set, connect } from 'mongoose';
import { dbConnect } from '@databases';
import { logger, stream } from '@utils/logger';

// const add = ""
// const add2: string = 'hhhhie jubsd';

console.log('hibhhss');

class App {
  public app: Application;
  public port: number | string;
  public env: string;

  constructor() {
    this.app = express();
    this.env = NODE_ENV;
    this.port = PORT || 9000;

    //this function automatic run
    this.initializeMiddlewares();
    this.connectToDatabase();
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening onn the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    try {
      const conn = await connect(dbConnect.url);
      logger.info('Database connecteD successfully!');
      logger.info(`MongoDBcf connected: ${conn.connection.host}`);
    } catch (error) {
      logger.info('Error connecting to the database:op', error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan('combined', { stream }));
  }
}

export default App;
