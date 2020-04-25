const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

const schema = buildSchema(`
  type Unidad {
    id: ID!
    nombre: String
    direccion: String
    telefono: String
    id_admin: Int
    active: Boolean
  }
  type Query {    
    getUnidades: [Unidad],
    getUnidad(id: ID) : Unidad,
    getUnidadesAdmin(id_admin: Int) : [Unidad]
  }
  type Mutation {
    updateUnidad(id: ID!, nombre: String, direccion: String, telefono: String, id_admin: Int, active: Boolean) : Boolean
    createUnidad(nombre: String, direccion: String, telefono: String, id_admin: Int, active: Boolean) : Boolean
    deleteUnidad(id: ID!) : Boolean
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
  getUnidades: (args, req) => queryDB(req, "select * from unidades").then(data => data),
  getUnidad: (args, req) => queryDB(req, "select * from unidades where id = ?", [args.id]).then(data => data[0]),
  getUnidadesAdmin: (args, req) => queryDB(req, "select * from unidades where id_admin = ?", [args.id_admin]).then(data => data),

  updateUnidad: (args, req) => queryDB(req, "update unidades SET ? where id = ?", [args, args.id]).then(data => data),
  createUnidad: (args, req) => queryDB(req, "insert into unidades SET ?", args).then(data => data),
  deleteUnidad: (args, req) => queryDB(req, "delete from unidades where id = ?", [args.id]).then(data => data)
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
