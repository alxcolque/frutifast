const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./config/database');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
	if(err){
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			console.error('La conexion de ha perdido!!!');
		}
		else if(err.code === 'ER_CON_COUNT_ERROR'){
			console.error('La base de datos ya tiene demasiadas conexiones');
		}
		if(err.code === 'ECONNREFUSED'){
			console.error('La conexión fue rechazada');
		}
	}
	if(connection) connection.release()
	console.log('Base de datos conectada');
	return;
});

pool.query = promisify(pool.query);
module.exports = pool;