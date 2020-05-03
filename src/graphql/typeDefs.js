
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
  id_tipo_usuario: Int!
  tipo_usuario: String!
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

    id_admin: Int!
    name_admin: String!
    last_name_admin: String!
    email_admin: String!
    dni_admin: String!
    tel_admin: String!    
  }

  type Bloque {
    id: ID!
    bloque: String!
    id_unidad: Int!
    
    unidad: String!
    direccion: String!
    telefono: String!
    active_unid: Boolean!
    id_admin: Int!

    name_admin: String
    last_name_admin: String!
    email_admin: String!
    dni_admin: String!
    tel_admin: String!

  }

  type Apto {
    id: ID!
    nomenclatura: String!
    id_unidad: Int!
    id_bloque: Int!
    id_tipo_apto: Int!
    id_propietario: Int!
    id_arrendatario: Int!

    unidad: String!
    direccion: String!
    telefono: String!
    id_admin: Int!
    active_unid: Boolean!

    name: String!
    last_name: String!
    email: String!
    dni: String!
    tel: String!

    bloque: String!
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
  }


type Query {    
  getUsers: [User!]!,
  getUser(dni: String) : User!

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
  updateUser(id: ID!, name: String, last_name: String, email: String, dni: String, telefono: String,  password: String, active: Boolean, tipo_usuario: Int) : Boolean!
  createUser(name: String, last_name: String, email: String, dni: String, telefono: String,  password: String, active: Boolean, tipo_usuario: Int) : Boolean!
  deleteUser(id: ID!) : Boolean!

  updateTipoUsuario(id: ID!, tipo_usuarios: String) : Boolean!
    createTipoUsuario(tipo_usuarios: String) : Boolean!
    deleteTipoUsuario(id: ID!) : Boolean!

    updateUnidad(id: ID!, nombre: String, direccion: String, telefono: String, id_admin: Int, active: Boolean) : Boolean!
    createUnidad(nombre: String, direccion: String, telefono: String, id_admin: Int, active: Boolean) : Boolean!
    deleteUnidad(id: ID!) : Boolean!
    
    updateBloque(id: ID!, nombre: String, id_unidad: Int) : Boolean!
    createBloque(nombre: String, id_unidad: Int) : Boolean!
    deleteBloque(id: ID!) : Boolean!

    updateApto(id: ID!, nomenclatura: String, id_unidad: Int, id_bloque: Int, id_tipo_apto: Int, id_propietario: Int,  id_arrendatario: Int) : Boolean!
    createApto(nomenclatura: String, id_unidad: Int, id_bloque: Int, id_tipo_apto: Int, id_propietario: Int,  id_arrendatario: Int) : Boolean!
    deleteApto(id: ID!) : Boolean

    
    updateTipoApto(id: ID!, tipo_apto: String, cobro: Float, vigencia: Int, metros: Int, id_unidad: Int) : Boolean!
    createTipoApto(tipo_apto: String, cobro: Float, vigencia: Int, metros: Int, id_unidad: Int) : Boolean!
    deleteTipoApto(id: ID!) : Boolean!
}
`);