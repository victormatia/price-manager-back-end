import { log } from 'console';
import express, { RequestHandler } from 'express';
import fileRoute from './routes/FileRoutes';

export default class App {
  private _server = express();

  constructor() {
    this.config();
    this.routes();
  }

  public init(port: string): void {
    this._server.listen(port, () => log('Server running on http://localhost:3001'));
  }

  private config():void {
    const accessControl: RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this._server.use(express.json());
    this._server.use(accessControl);
  }

  private routes(): void {
    const serverSucces: RequestHandler = async (_req, res) => { res.status(200).send('OK'); };

    this._server.get('/', serverSucces);

    this._server.use('/validate', fileRoute);
  }
}