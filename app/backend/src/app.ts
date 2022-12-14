import * as express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';
import leaderboard from './routes/leaderboard';
import matches from './routes/matches';
import teams from './routes/teams';
import user from './routes/user';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', user);
    this.app.use('/teams', teams);
    this.app.use('/matches', matches);
    this.app.use('/leaderboard', leaderboard);
    this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
