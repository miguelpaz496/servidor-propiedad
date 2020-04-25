const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

const schema = buildSchema(`
  type Apto {
    id: ID!
    nomenclatura: String
    id_unidad: Int
    id_bloque: Int
    id_tipo_apto: Int
    id_propietario: Int
    id_arrendatario: Int
  }
  type Query {    
    getAptos: [Apto],
    getApto(id: ID!) : Apto
  }
  type Mutation {
    updateApto(id: ID!, nomenclatura: String, id_unidad: Int, id_bloque: Int, id_tipo_apto: Int, id_propietario: Int,  id_arrendatario: Int) : Boolean
    createApto(nomenclatura: String, id_unidad: Int, id_bloque: Int, id_tipo_apto: Int, id_propietario: Int,  id_arrendatario: Int) : Boolean
    deleteApto(id: ID!) : Boolean
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
  getAptos: (args, req) => queryDB(req, "select * from aptos").then(data => data),
  getApto: (args, req) => queryDB(req, "select * from aptos where id = ?", [args.id]).then(data => data[0]),

  updateApto: (args, req) => queryDB(req, "update aptos SET ? where id = ?", [args, args.id]).then(data => data),
  createApto: (args, req) => queryDB(req, "insert into aptos SET ?", args).then(data => data),
  deleteApto: (args, req) => queryDB(req, "delete from aptos where id = ?", [args.id]).then(data => data)
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
