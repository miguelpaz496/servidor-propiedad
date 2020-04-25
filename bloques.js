const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

const schema = buildSchema(`
  type User {
    id: ID!
    name: String
    last_name: String
    email: String
    dni: String
    telefono: String
    password: String
    active: Boolean
    tipo_usuario: Int
  }
  type Query {    
    getUsers: [User],
    getUser(dni: String) : User
  }
  type Mutation {
    updateUser(id: ID!, name: String, last_name: String, email: String, dni: String, telefono: String,  password: String, active: Boolean, tipo_usuario: Int) : Boolean
    createUser(name: String, last_name: String, email: String, dni: String, telefono: String,  password: String, active: Boolean, tipo_usuario: Int) : Boolean
    deleteUser(id: ID!) : Boolean
  }
`);

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

const root = {
  getUsers: (args, req) => queryDB(req, "select * from users").then(data => data),
  getUser: (args, req) => queryDB(req, "select * from users where dni = ?", [args.dni]).then(data => data[0]),

  updateUser: (args, req) => queryDB(req, "update users SET ? where id = ?", [args, args.id]).then(data => data),
  createUser: (args, req) => queryDB(req, "insert into users SET ?", args).then(data => data),
  deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data)
};

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
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
