import { GraphQLServer } from 'graphql-yoga';
import { schema } from './graphql/typeDefs';
import { resolvers, queryDB } from './graphql/resolvers';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());





app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'horizontal'
  });
  req.mysqlDb.connect();
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');

