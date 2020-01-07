// Imports: Express
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import { Request, Response, } from 'express';

// Imports: GraphQL
import SERVER from './graphql/apolloServer';

// DataBase Creation
const MONGO_DB_URL = "mongodb://admin:pass@localhost:27017?authSource=admin";
import { initDB } from './database/dbSetupScript';
initDB(MONGO_DB_URL);

// Initialize the app
const app = express();

// Middleware: GraphQL
SERVER.applyMiddleware({
    app: app,
    path: '/graphql'
});
// Express: Port
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method'));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'hello world',
    });
});

// Express: Listener
app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
    console.log(`http://localhost:${PORT}/graphql`);
});
// Exports
export default app;
