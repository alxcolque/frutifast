const pool = require("../connectionDB");
module.exports = {
  listado() {
    return new Promise((resolve, reject) => {
      pool.query("select * from ", (err, peliculas) => {
        if (err) reject(err);
        else resolve(peliculas);
      });
    });
  },
  agregar(titulo, portada, video, sinopsis) {
    return new Promise((resolve, reject) => {
      pool.query(
        "insert into peliculas (titulo, portada, video, sinopsis) values ( ?,? ,?, ?) ",
        [titulo, portada, video, sinopsis],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
  borrar(id) {
    return new Promise((resolve, reject) => {
      pool.query("delete from peliculas where id= ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  modificar(id, titulo, portada, video, sinopsis) {
    return new Promise((resolve, reject) => {
      pool.query(
        "update peliculas (titulo, portada, video, sinopsis) set ( ?,? ,?, ?) where id= ? ",
        [titulo, portada, video, sinopsis, id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
  getpelicula(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "select * from peliculas where id=?",
        [id],
        (err, pelicula) => {
          if (err) reject(err);
          else resolve(pelicula);
        }
      );
    });
  },
};