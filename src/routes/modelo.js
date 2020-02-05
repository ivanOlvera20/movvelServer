const express = require("express");
const router = express.Router();

//variable para la conexion a base de datos
let pool = require("../database");

//obtener todos
router.get("/", function(req, res) {
  const sql = "SELECT * FROM Modelo";
  pool.query(sql, function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      res.send(err);
    }
  });
});

//obtener uno por ID
router.get("/:idModelo", function(req, res, next) {
  const id = req.params.idModelo;
  const sql = `SELECT * FROM Modelo WHERE idModelo=${id}`;
  pool.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: "Something failed!" });
    }
    res.json(row[0]);
  });
});

// borrar uno

router.delete("/:idModelo", (req, res, next) => {
  pool.query(
    `DELETE FROM Modelo Where idModelo = ?`,
    [req.params.idModelo],
    (err, row, fields) => {
      if (!err) res.send("deleted succesfully");
      else console.log(err);
    }
  );
});

// Insertar un modelo

router.post("/", (req, res) => {
  let mod = req.body;
  const sql = `SET @idModelo = ?; SET @descripcion = ?; \
  CALL modeloAddOrEdit(@idModelo,@descripcion)`;

  pool.query(sql, [mod.idModelo, mod.descripcion], (err, rows, fields) => {
    if (!err)
      rows.forEach(element => {
        if (element.constructor == Array)
          res.send("Id de modelo insertado es: " + element[0].idModelo);
      });
    else console.log(err);
  });
});

// Insertar un modelo

router.put("/", (req, res, next) => {
  let mod = req.body;
  const sql =
    "SET @idModelo = ?; SET @descripcion = ?; \
  CALL modeloAddOrEdit(@idModelo,@descripcion);";

  pool.query(sql, [mod.idModelo, mod.descripcion], (err, row, fields) => {
    if (!err) res.send("Updated Succesfully");
    else console.log(err);
  });
});

module.exports = router;
