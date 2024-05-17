import express, { Application } from 'express';
import { PORT, NODE_ENV } from '@config';
import morgan from 'morgan';
import { set, connect } from 'mongoose';
import { dbConnect } from '@databases';

// const add = ""
// const add2: string = 'hhhhie jubsd';

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
      console.log(`app ddisss listening on ${this.port}`);
      console.log(`-----${this.env}-----`);
    });
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    try {
      const conn = await connect(dbConnect.url);
      console.log('Database connecteD successfully!');
      console.log(`MongoDBcf connected: ${conn.connection.host}`);
    } catch (error) {
      console.log('Error connecting to the database:op', error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan('dev'));
  }
}

export default App;
