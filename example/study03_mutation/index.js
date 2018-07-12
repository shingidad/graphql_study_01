require('dotenv').config();
const express = require('express');
const expressGraphQL = require('express-graphql');
const jsonServer = require('json-server');
const schema = require('./schema/schema');

const { PORT, REST_ROUTE } = process.env;

const app = express();
app.use(REST_ROUTE, jsonServer.router('db.json'));
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`open http://localhost:${PORT}/graphql`)
});