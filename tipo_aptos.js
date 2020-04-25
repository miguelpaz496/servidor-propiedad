const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

const schema = buildSchema(`
  type TipoApto {
    id: ID!
    tipo_apto: String
    cobro: Float
    vigencia: Int
    metros: Int
    id_unidad: Int
  }
  type Query {    
    getTipoAptos: [TipoApto],
    getTipoApto(id: ID!) : TipoApto
    getTipoAptosUnidad(id_unidad: Int!): [TipoApto],
  }
  type Mutation {
    updateTipoApto(id: ID!, tipo_apto: String, cobro: Float, vigencia: Int, metros: Int, id_unidad: Int) : Boolean
    createTipoApto(tipo_apto: String, cobro: Float, vigencia: Int, metros: Int, id_unidad: Int) : Boolean
    deleteTipoApto(id: ID!) : Boolean
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
  getTipoAptos: (args, req) => queryDB(req, "select * from tipo_aptos").then(data => data),
  getTipoApto: (args, req) => queryDB(req, "select * from tipo_aptos where id = ?", [args.id]).then(data => data[0]),
  getTipoAptosUnidad: (args, req) => queryDB(req, "select * from tipo_aptos where id_unidad = ?", [args.id_unidad]).then(data => data),

  updateTipoApto: (args, req) => queryDB(req, "update tipo_aptos SET ? where id = ?", [args, args.id]).then(data => data),
  createTipoApto: (args, req) => queryDB(req, "insert into tipo_aptos SET ?", args).then(data => data),
  deleteTipoApto: (args, req) => queryDB(req, "delete from tipo_aptos where id = ?", [args.id]).then(data => data)
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
