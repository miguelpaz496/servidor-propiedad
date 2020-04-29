export const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

export const resolvers = {
    
        getUsers: (args, req) => queryDB(req, "select * from users").then(data => data),
        getUser: (args, req) => queryDB(req, "select * from users where dni = ?", [args.dni]).then(data => data[0]),
      
        updateUser: (args, req) => queryDB(req, "update users SET ? where id = ?", [args, args.id]).then(data => data),
        createUser: (args, req) => queryDB(req, "insert into users SET ?", args).then(data => data),
        deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data),

        //User: getUsers()=> getTipoUsuario

        //TIPO USUARIOS ----------------------------------------------------------------------------------------
        getTipoUsuarios: (args, req) => queryDB(req, "select * from tipo_usuarios").then(data => data),
        getTipoUsuario: (args, req) => queryDB(req, "select * from tipo_usuarios where id = ?", [args.id]).then(data => data[0]),

        updateTipoUsuario: (args, req) => queryDB(req, "update tipo_usuarios SET ? where id = ?", [args, args.id]).then(data => data),
        createTipoUsuario: (args, req) => queryDB(req, "insert into tipo_usuarios SET ?", args).then(data => data),
        deleteTipoUsuario: (args, req) => queryDB(req, "delete from tipo_usuarios where id = ?", [args.id]).then(data => data),

        //UNIDADES -------------------------------------------------------------------------------------------------
        getUnidades: (args, req) => queryDB(req, "select * from unidades").then(data => data),
        getUnidad: (args, req) => queryDB(req, "select * from unidades where id = ?", [args.id]).then(data => data[0]),
        getUnidadesAdmin: (args, req) => queryDB(req, "select * from unidades where id_admin = ?", [args.id_admin]).then(data => data),
      
        updateUnidad: (args, req) => queryDB(req, "update unidades SET ? where id = ?", [args, args.id]).then(data => data),
        createUnidad: (args, req) => queryDB(req, "insert into unidades SET ?", args).then(data => data),
        deleteUnidad: (args, req) => queryDB(req, "delete from unidades where id = ?", [args.id]).then(data => data),

        //BLOQUES----------------------------------------------------------------------------------------------------------
                
        getBloques: (args, req) => queryDB(req, "select * from bloques").then(data => data),
        getBloque: (args, req) => queryDB(req, "select * from bloques where id = ?", [args.id]).then(data => data[0]),
        getBloquesUnidad: (args, req) => queryDB(req, "select * from bloques where id_unidad = ?", [args.id_unidad]).then(data => data),

        updateBloque: (args, req) => queryDB(req, "update bloques SET ? where id = ?", [args, args.id]).then(data => data),
        createBloque: (args, req) => queryDB(req, "insert into bloques SET ?", args).then(data => data),
        deleteBloque: (args, req) => queryDB(req, "delete from bloques where id = ?", [args.id]).then(data => data),

        //APTOS---------------------------------------------------------------------------------------------------------------
        
        getAptos: (args, req) => queryDB(req, "select * from aptos").then(data => data),
        getApto: (args, req) => queryDB(req, "select * from aptos where id = ?", [args.id]).then(data => data[0]),
        getAptosBloque: (args, req) => queryDB(req, "select * from aptos where id_bloque = ?", [args.id_bloque]).then(data => data),

        updateApto: (args, req) => queryDB(req, "update aptos SET ? where id = ?", [args, args.id]).then(data => data),
        createApto: (args, req) => queryDB(req, "insert into aptos SET ?", args).then(data => data),
        deleteApto: (args, req) => queryDB(req, "delete from aptos where id = ?", [args.id]).then(data => data),

        //TIPO APTOS ------------------------------------------------------------------------------------------------------------
        
        getTipoAptos: (args, req) => queryDB(req, "select * from tipo_aptos").then(data => data),
        getTipoApto: (args, req) => queryDB(req, "select * from tipo_aptos where id = ?", [args.id]).then(data => data[0]),
        getTipoAptosUnidad: (args, req) => queryDB(req, "select * from tipo_aptos where id_unidad = ?", [args.id_unidad]).then(data => data),

        updateTipoApto: (args, req) => queryDB(req, "update tipo_aptos SET ? where id = ?", [args, args.id]).then(data => data),
        createTipoApto: (args, req) => queryDB(req, "insert into tipo_aptos SET ?", args).then(data => data),
        deleteTipoApto: (args, req) => queryDB(req, "delete from tipo_aptos where id = ?", [args.id]).then(data => data)
      
}