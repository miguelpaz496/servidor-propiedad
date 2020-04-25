const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

const schema = buildSchema(`
  type Tipo_usuario {
    id: ID!
    tipo_usuarios: String
  }
  type Query {    
    getTipoUsuarios: [Tipo_usuario],
    getTipoUsuario (id: ID!) : Tipo_usuario
  }
  type Mutation {
    updateTipoUsuario(id: ID!, tipo_usuarios: String) : Boolean
    createTipoUsuario(tipo_usuarios: String) : Boolean
    deleteTipoUsuario(id: ID!) : Boolean
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
  getTipoUsuarios: (args, req) => queryDB(req, "select * from tipo_usuarios").then(data => data),
  getTipoUsuario: (args, req) => queryDB(req, "select * from tipo_usuarios where id = ?", [args.id]).then(data => data[0]),

  updateTipoUsuario: (args, req) => queryDB(req, "update tipo_usuarios SET ? where id = ?", [args, args.id]).then(data => data),
  createTipoUsuario: (args, req) => queryDB(req, "insert into tipo_usuarios SET ?", args).then(data => data),
  deleteTipoUsuario: (args, req) => queryDB(req, "delete from tipo_usuarios where id = ?", [args.id]).then(data => data)
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
