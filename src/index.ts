// const express = require('express');
// const bodyParser = require('body-parser');
//
// // The GraphQL endpoint
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
//
// // GraphiQL, a visual editor for queries
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Imports: Express
import * as express from 'express';
import { Request, Response } from 'express';
// Imports: GraphQL
import SERVER from './graphql/schema';

// Initialize the app
const app = express();

// Middleware: GraphQL
SERVER.applyMiddleware({
    app: app
});
// Express: Port
const { PORT = 3000 } = process.env;

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
