const express = require("express");
const router = express.Router();

//variable para la conexion a base de datos
let pool = require("../database");

//obtener todos
router.get("/", function(req, res) {
  const sql = "SELECT * FROM Productos";
  pool.query(sql, function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      res.send(err);
    }
  });
});

//obtener uno por ID
router.get("/:idProductos", function(req, res, next) {
  const id = req.params.idProductos;
  const sql = `SELECT * FROM Productos WHERE idProductos=${id}`;
  pool.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: "Something failed!" });
    }
    res.json(row[0]);
  });
});

// borrar uno

router.delete("/:idProductos", (req, res, next) => {
  pool.query(
    `DELETE FROM Productos Where idProductos = ?`,
    [req.params.idProductos],
    (err, row, fields) => {
      if (!err) res.send("deleted succesfully");
      else console.log(err);
    }
  );
});

// Insertar un color

router.post("/", (req, res) => {
  let pro = req.body;
  const sql =
    "SET @idProductos = ?;\
    SET @Descripcion = ?;\
    SET @Codigo = ?;\
    SET @Familia_idFamilia = ?;\
    SET @Linea_idLinea = ?;\
    SET @Modelo_idModelo = ?;\
    SET @Presentacion_idPresentacion = ?;\
    SET @Precio_lista_idPrecio_lista = ?;\
    SET @Foto = ?;\
        CALL productoAddOrEdit(@idProductos,\
                                @Descripcion,\
                                @Codigo,\
                                @Familia_idFamilia,\
                                @Linea_idLinea,\
                                @Modelo_idModelo,\
                                @Presentacion_idPresentacion,\
                                @Precio_lista_idPrecio_lista,\
                                @Foto)";

  pool.query(
    sql,
    [
      pro.idProductos,
      pro.Descripcion,
      pro.Codigo,
      pro.Familia_idFamilia,
      pro.Linea_idLinea,
      pro.Modelo_idModelo,
      pro.Presentacion_idPresentacion,
      pro.Precio_lista_idPrecio_lista,
      pro.Foto
    ],
    (err, rows, fields) => {
      if (!err)
        rows.forEach(element => {
          if (element.constructor == Array)
            res.send("Id de producto es: " + element[0].idProductos);
        });
      else console.log(err);
    }
  );
});

// Insertar un color

router.put("/", (req, res) => {
  let pro = req.body;
  const sql =
    "SET @idProductos = ?;\
    SET @Descripcion = ?;\
    SET @Codigo = ?;\
    SET @Familia_idFamilia = ?;\
    SET @Linea_idLinea = ?;\
    SET @Modelo_idModelo = ?;\
    SET @Presentacion_idPresentacion = ?;\
    SET @Precio_lista_idPrecio_lista = ?;\
    SET @Foto = ?;\
        CALL productoAddOrEdit(@idProductos,\
                                @Descripcion,\
                                @Codigo,\
                                @Familia_idFamilia,\
                                @Linea_idLinea,\
                                @Modelo_idModelo,\
                                @Presentacion_idPresentacion,\
                                @Precio_lista_idPrecio_lista,\
                                @Foto)";

  pool.query(
    sql,
    [
      pro.idProductos,
      pro.Descripcion,
      pro.Codigo,
      pro.Familia_idFamilia,
      pro.Linea_idLinea,
      pro.Modelo_idModelo,
      pro.Presentacion_idPresentacion,
      pro.Precio_lista_idPrecio_lista,
      pro.Foto
    ],
    (err, rows, fields) => {
      if (!err) res.send("Updated Succesfully");
      else console.log(err);
    }
  );
});

module.exports = router;

/* {
	"idProductos": "0",
    "Descripcion": "new product",
    "Codigo": "12345",
    "Familia_idFamilia": "1",
    "Linea_idLinea": "1",
   "Modelo_idModelo": "1",
   "Presentacion_idPresentacion": "1",
   "Precio_lista_idPrecio_lista": "1"
} */
