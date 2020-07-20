const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./helpers/keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
	if(err){
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			console.error('La conexion de ha perdido!!!');
		}
		else if(err.code === 'ER_CON_COUNT_ERROR'){
			console.error('La base de datos ya tiene demasiadas conexiones');
		}
		else if(err.code === 'ECONNREFUSED'){
			console.error('La conexión fue rechazada');
		}else{
			console.error('Ha ocurrido un error más grave que tu');
		}
	}
	else if(connection) connection.release()
	console.log('Base de datos conectada');
	return;
});

pool.query = promisify(pool.query);
module.exports = pool;