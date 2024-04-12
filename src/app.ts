import express, { Application } from 'express';
import { PORT, NODE_ENV } from '@config';
import morgan from 'morgan';
import { set, connect } from 'mongoose';
import { dbConnect } from '@databases';

class App {
  public app: Application;
  public port: number | string;
  public env: string;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 9000;

    //this function automatic run
    this.initializeMiddlewares();
    this.connectToDatabase();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app is listening on ${this.port}`);
      console.log(`-----${this.env}-----`);
    });
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    try {
      await connect(dbConnect.url);
      console.log('Database connecteD successfully!');
    } catch (error) {
      console.log('Error connecting to the database:', error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan('dev'));
  }
}

export default App;
