import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import { PORT, NODE_ENV } from './config';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { set, connect, disconnect } from 'mongoose';
import { dbConnect } from './databases';
import { logger, stream } from './utils/logger';
import { Routes } from './interfaces/routes.interface';
// import { errorHandler } from '@/utils/errorHandler';
import errorMiddleware from './middlewares/error.middleware';

// const add = ""
// const add2: string = 'hhhhie jubsd';

// console.log('hibhhssjdd');

class App {
  public app: Application;
  public port: number | string;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 9000;

    //this function automatic run
    this.initializeMiddlewares();
    this.connectToDatabase();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening onn the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      logger.info('database (mongoDbB) has been disconnect successfully');
    } catch (error) {
      logger.info('something happen when closing database', error);
    }
  }

  public getServer() {
    return this.app;
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
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }
  private initializeErrorHandling() {
    // this.app.use(errorHandler);
    this.app.use(errorMiddleware);
  }
}

export default App;
