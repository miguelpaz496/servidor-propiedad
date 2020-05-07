
const { buildSchema } = require('graphql');

export const schema = buildSchema(`
type User {
  id: ID!
  name: String!
  last_name: String!
  email: String!
  dni: String!
  telefono: String!
  password: String!
  active: Boolean!  
  id_admin: Int
  id_tipo_usuario: Int
  tipo_usuario: String
}
type Tipo_usuario {
    id: ID!
    tipo_usuarios: String!
  }

  type Unidad {
    id: ID!
    nombre: String!
    direccion: String!
    telefono: String!
    active: Boolean!

    id_admin: Int
    name: String
    last_name: String
    email: String
    dni: String
    tel: String    
  }

  type Bloque {
    id: ID!
    bloque: String!
    id_unidad: Int!
    
    unidad: String
    direccion: String
    telefono: String
    active_unid: Boolean
    id_admin: Int

    name: String
    last_name: String
    email: String
    dni: String
    tel: String

  }

  type Apto {
    id: ID!
    nomenclatura: String!
    id_unidad: Int!
    id_bloque: Int!
    id_tipo_apto: Int!
    id_propietario: Int!
    id_arrendatario: Int!

    unidad: String
    direccion: String
    telefono: String
    id_admin: Int
    active_unid: Boolean

    name: String
    last_name: String
    email: String
    dni: String
    tel: String

    bloque: String
    tipo_apto: String
    cobro: Float
    vigencia: Int
    metros: Int

  }

  type TipoApto {
    id: ID!
    tipo_apto: String!
    cobro: Float!
    vigencia: Int!
    metros: Int!
    id_unidad: Int!

    unidad: String
    direccion: String
    telefono: String
    id_admin: Int
    active_unid: Boolean

    name: String
    last_name: String
    email: String
    dni: String
    tel: String
    active_admin: Boolean
  }


type Query {    
  getUsers: [User!]!,
  getUser(dni: String) : User!
  getUserEmail(email: String) : User!

  getTipoUsuarios: [Tipo_usuario!]!,
  getTipoUsuario (id: ID!) : Tipo_usuario!
     
  getUnidades: [Unidad!]!,
  getUnidad(id: ID) : Unidad!,
  getUnidadesAdmin(dni: String!) : [Unidad!]!
     
  getBloques: [Bloque!]!,
  getBloque(id: ID!) : Bloque!
  getBloquesUnidad(id_unidad: Int!): [Bloque!]!
      
  getAptos: [Apto!]!,
  getApto(id: ID!) : Apto!
  getAptosBloque: [Apto],
  getAptosTipo(id_tipo_apto: Int!): [Apto],
  getAptosPropietario(id_propietario: Int!): [Apto],
  getAptosArrendatario(id_arrendatario: Int!): [Apto],

      
  getTipoAptos: [TipoApto!]!,
  getTipoApto(id: ID!) : TipoApto!
  getTipoAptosUnidad(id_unidad: Int!): [TipoApto!]!,

}


type Mutation {
    updateUser(id: ID!, name: String, last_name: String, email: String, dni: String, telefono: String,  password: String, active: Boolean, tipo_usuario: Int) : Int!
    createUser(name: String, last_name: String, email: String, dni: String, telefono: String,  password: String, active: Boolean, tipo_usuario: Int) : String!
    deleteUser(id: ID!) : Int!

    updateTipoUsuario(id: ID!, tipo_usuarios: String) : Int!
    createTipoUsuario(tipo_usuarios: String) : String!
    deleteTipoUsuario(id: ID!) : Int!

    updateUnidad(id: ID!, nombre: String, direccion: String, telefono: String, id_admin: Int, active: Boolean) : Int!
    createUnidad(nombre: String, direccion: String, telefono: String, id_admin: Int, active: Boolean) : String!
    deleteUnidad(id: ID!) : Int!
    
    updateBloque(id: ID!, nombre: String, id_unidad: Int) : Int!
    createBloque(nombre: String, id_unidad: Int) : String!
    deleteBloque(id: ID!) : Int!

    updateApto(id: ID!, nomenclatura: String, id_unidad: Int, id_bloque: Int, id_tipo_apto: Int, id_propietario: Int,  id_arrendatario: Int) : Int!
    createApto(nomenclatura: String, id_unidad: Int, id_bloque: Int, id_tipo_apto: Int, id_propietario: Int,  id_arrendatario: Int) : String!
    deleteApto(id: ID!) : Int!

    
    updateTipoApto(id: ID!, tipo_apto: String, cobro: Float, vigencia: Int, metros: Int, id_unidad: Int) : Int!
    createTipoApto(tipo_apto: String, cobro: Float, vigencia: Int, metros: Int, id_unidad: Int) : String!
    deleteTipoApto(id: ID!) : Int!
}
`);