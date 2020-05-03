export const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

export const resolvers = {
    
        getUsers: (args, req) => queryDB(req, "select u.id,name,u.last_name,u.email,u.dni,u.telefono,u.password,u.active,u.id_admin,tu.id as id_tipo_usuario,tu.tipo_usuarios as tipo_usuario,u.id_admin from users u INNER JOIN tipo_usuarios tu ON u.id = tu.id").then(data => data),
        getUser: (args, req) => queryDB(req, "select u.id,name,u.last_name,u.email,u.dni,u.telefono,u.password,u.active,u.id_admin,tu.id as id_tipo_usuario,tu.tipo_usuarios as tipo_usuario,u.id_admin from users u INNER JOIN tipo_usuarios tu ON u.id = tu.id where u.dni = ?", [args.dni]).then(data => data[0]),
      
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
        getUnidades: (args, req) => queryDB(req, "select un.id, un.nombre,un.direccion,un.telefono,un.id_admin,un.active, u.name as name_admin, u.last_name as last_name_admin, u.email as email_admin, u.dni as dni_admin,u.telefono as tel_admin from unidades un INNER JOIN users u ON un.id_admin = u.id").then(data => data),
        getUnidad: (args, req) => queryDB(req, "select un.id, un.nombre,un.direccion,un.telefono,un.id_admin,un.active, u.name as name_admin, u.last_name as last_name_admin, u.email as email_admin, u.dni as dni_admin,u.telefono as tel_admin from unidades un INNER JOIN users u ON un.id_admin = u.id where u.id = ?", [args.id]).then(data => data[0]),
        getUnidadesAdmin: (args, req) => queryDB(req, "select un.id, un.nombre,un.direccion,un.telefono,un.id_admin,un.active, u.name as name_admin, u.last_name as last_name_admin, u.email as email_admin, u.dni as dni_admin,u.telefono as tel_admin from unidades un INNER JOIN users u ON un.id_admin = u.id where u.dni = ?", [args.dni]).then(data => data),
      
        updateUnidad: (args, req) => queryDB(req, "update unidades SET ? where id = ?", [args, args.id]).then(data => data),
        createUnidad: (args, req) => queryDB(req, "insert into unidades SET ?", args).then(data => data),
        deleteUnidad: (args, req) => queryDB(req, "delete from unidades where id = ?", [args.id]).then(data => data),

        //BLOQUES----------------------------------------------------------------------------------------------------------
                
        getBloques: (args, req) => queryDB(req, "select b.id, b.nombre as bloque, b.id_unidad,un.nombre as unidad,un.direccion as direccion,un.telefono as telefono,un.active as active_unid,un.id_admin,u.name as name_admin,u.last_name as last_name_admin,u.email as email_admin,u.dni as dni_admin,u.telefono as tel_admin  from bloques b INNER JOIN unidades un ON b.id_unidad = un.id INNER JOIN users u ON un.id_admin = u.id").then(data => data),  
        getBloque: (args, req) => queryDB(req, "select b.id,b.nombre as bloque,b.id_unidad,un.nombre as unidad,un.direccion as direccion,un.telefono as telefono,un.active as active_unid,un.id_admin,u.name as name_admin,u.last_name as last_name_admin,u.email as email_admin,u.dni as dni_admin,u.telefono as tel_admin  from bloques b INNER JOIN unidades un ON b.id_unidad = un.id INNER JOIN users u ON un.id_admin = u.id WHERE b.id = ?", [args.id]).then(data => data[0]),
        getBloquesUnidad: (args, req) => queryDB(req, "select b.id,b.nombre as bloque,b.id_unidad,un.nombre as unidad,un.direccion as direccion,un.telefono as telefono,un.active as active_unid,un.id_admin,u.name as name_admin,u.last_name as last_name_admin,u.email as email_admin,u.dni as dni_admin,u.telefono as tel_admin  from bloques b INNER JOIN unidades un ON b.id_unidad = un.id INNER JOIN users u ON un.id_admin = u.id WHERE un.id = ?", [args.id_unidad]).then(data => data),
       // getBloques: (args, req) => queryDB(req, "select b.id, b.nombre as bloque, b.id_unidad bloques b").then(data => data),  
        //getBloque: (args, req) => queryDB(req, "select b.id,b.nombre as bloque,b.id_unidad from bloques b  WHERE b.id = ?", [args.id]).then(data => data[0]),
        //getBloquesUnidad: (args, req) => queryDB(req, "select b.id,b.nombre as bloque,b.id_unidad from bloques b WHERE b.id_unidad = ?", [args.id_unidad]).then(data => data),

        updateBloque: (args, req) => queryDB(req, "update bloques SET ? where id = ?", [args, args.id]).then(data => data),
        createBloque: (args, req) => queryDB(req, "insert into bloques SET ?", args).then(data => data),
        deleteBloque: (args, req) => queryDB(req, "delete from bloques where id = ?", [args.id]).then(data => data),

        //APTOS---------------------------------------------------------------------------------------------------------------
        
        getAptos: (args, req) => queryDB(req, "SELECT a.id,a.nomenclatura,a.id_unidad,a.id_bloque,a.id_tipo_apto,a.id_propietario,a.id_arrendatario, un.nombre as unidad,un.direccion,un.telefono,un.id_admin,un.active as active_unid,u.name,u.last_name,u.email,u.dni,u.telefono as tel,b.nombre as bloque,ta.tipo_apto,ta.cobro,ta.vigencia,ta.metros FROM aptos a INNER JOIN unidades un ON a.id_unidad=un.id INNER JOIN USERS u ON un.id_admin= u.id INNER JOIN bloques b ON a.id_bloque=b.id INNER JOIN tipo_aptos ta ON a.id_tipo_apto=ta.id").then(data => data),
        getApto: (args, req) => queryDB(req, "SELECT a.id,a.nomenclatura,a.id_unidad,a.id_bloque,a.id_tipo_apto,a.id_propietario,a.id_arrendatario, un.nombre as unidad,un.direccion,un.telefono,un.id_admin,un.active as active_unid,u.name,u.last_name,u.email,u.dni,u.telefono as tel,b.nombre as bloque,ta.tipo_apto,ta.cobro,ta.vigencia,ta.metros FROM aptos a INNER JOIN unidades un ON a.id_unidad=un.id INNER JOIN USERS u ON un.id_admin= u.id INNER JOIN bloques b ON a.id_bloque=b.id INNER JOIN tipo_aptos ta ON a.id_tipo_apto=ta.id WHERE a.id = ?", [args.id]).then(data => data[0]),
        getAptosBloque: (args, req) => queryDB(req, "SELECT a.id,a.nomenclatura,a.id_unidad,a.id_bloque,a.id_tipo_apto,a.id_propietario,a.id_arrendatario, un.nombre as unidad,un.direccion,un.telefono,un.id_admin,un.active as active_unid,u.name,u.last_name,u.email,u.dni,u.telefono as tel,b.nombre as bloque,ta.tipo_apto,ta.cobro,ta.vigencia,ta.metros FROM aptos a INNER JOIN unidades un ON a.id_unidad=un.id INNER JOIN USERS u ON un.id_admin= u.id INNER JOIN bloques b ON a.id_bloque=b.id INNER JOIN tipo_aptos ta ON a.id_tipo_apto=ta.id WHERE a.id_bloque = ?", [args.id_bloque]).then(data => data),
        getAptosTipo: (args, req) => queryDB(req, "SELECT a.id,a.nomenclatura,a.id_unidad,a.id_bloque,a.id_tipo_apto,a.id_propietario,a.id_arrendatario, un.nombre as unidad,un.direccion,un.telefono,un.id_admin,un.active as active_unid,u.name,u.last_name,u.email,u.dni,u.telefono as tel,b.nombre as bloque,ta.tipo_apto,ta.cobro,ta.vigencia,ta.metros FROM aptos a INNER JOIN unidades un ON a.id_unidad=un.id INNER JOIN USERS u ON un.id_admin= u.id INNER JOIN bloques b ON a.id_bloque=b.id INNER JOIN tipo_aptos ta ON a.id_tipo_apto=ta.id WHERE a.id_tipo_apto = ?", [args.id_tipo_apto]).then(data => data),
        getAptosPropietario: (args, req) => queryDB(req, "SELECT a.id,a.nomenclatura,a.id_unidad,a.id_bloque,a.id_tipo_apto,a.id_propietario,a.id_arrendatario, un.nombre as unidad,un.direccion,un.telefono,un.id_admin,un.active as active_unid,u.name,u.last_name,u.email,u.dni,u.telefono as tel,b.nombre as bloque,ta.tipo_apto,ta.cobro,ta.vigencia,ta.metros FROM aptos a INNER JOIN unidades un ON a.id_unidad=un.id INNER JOIN USERS u ON un.id_admin= u.id INNER JOIN bloques b ON a.id_bloque=b.id INNER JOIN tipo_aptos ta ON a.id_tipo_apto=ta.id WHERE a.id_propietario = ?", [args.id_propietario]).then(data => data),
        getAptosArrendatario: (args, req) => queryDB(req, "SELECT a.id,a.nomenclatura,a.id_unidad,a.id_bloque,a.id_tipo_apto,a.id_propietario,a.id_arrendatario, un.nombre as unidad,un.direccion,un.telefono,un.id_admin,un.active as active_unid,u.name,u.last_name,u.email,u.dni,u.telefono as tel,b.nombre as bloque,ta.tipo_apto,ta.cobro,ta.vigencia,ta.metros FROM aptos a INNER JOIN unidades un ON a.id_unidad=un.id INNER JOIN USERS u ON un.id_admin= u.id INNER JOIN bloques b ON a.id_bloque=b.id INNER JOIN tipo_aptos ta ON a.id_tipo_apto=ta.id WHERE a.id_arrendatario = ?", [args.id_arrendatario]).then(data => data),

        updateApto: (args, req) => queryDB(req, "update aptos SET ? WHERE id = ?", [args, args.id]).then(data => data),
        createApto: (args, req) => queryDB(req, "insert into aptos SET ?", args).then(data => data),
        deleteApto: (args, req) => queryDB(req, "delete FROM aptos WHERE id = ?", [args.id]).then(data => data),

        //TIPO APTOS ------------------------------------------------------------------------------------------------------------
        
        getTipoAptos: (args, req) => queryDB(req, "SELECT * FROM tipo_aptos").then(data => data),
        getTipoApto: (args, req) => queryDB(req, "SELECT * FROM tipo_aptos WHERE id = ?", [args.id]).then(data => data[0]),
        getTipoAptosUnidad: (args, req) => queryDB(req, "SELECT * FROM tipo_aptos WHERE id_unidad = ?", [args.id_unidad]).then(data => data),

        updateTipoApto: (args, req) => queryDB(req, "update tipo_aptos SET ? WHERE id = ?", [args, args.id]).then(data => data),
        createTipoApto: (args, req) => queryDB(req, "insert into tipo_aptos SET ?", args).then(data => data),
        deleteTipoApto: (args, req) => queryDB(req, "delete FROM tipo_aptos WHERE id = ?", [args.id]).then(data => data)
      
}