const express = require("express");
const router = express.Router();

//variable para la conexion a base de datos
let pool = require("../database");

//obtener todos
router.get("/", function(req, res) {
  const sql = "SELECT * FROM Color";
  pool.query(sql, function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      res.send(err);
    }
  });
});

//obtener uno por ID
router.get("/:idColor", function(req, res, next) {
  const id = req.params.idColor;
  const sql = `SELECT * FROM Color WHERE idColor=${id}`;
  pool.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: "Something failed!" });
    }
    res.json(row[0]);
  });
});

// borrar uno

router.delete("/:idColor", (req, res, next) => {
  pool.query(
    `DELETE FROM Color Where idColor = ?`,
    [req.params.idColor],
    (err, row, fields) => {
      if (!err) res.send("deleted succesfully");
      else console.log(err);
    }
  );
});

// Insertar un color

router.post("/", (req, res) => {
  let col = req.body;
  const sql =
    "SET @idColor = ?; SET @Descripcion = ?; \
  CALL colorAddOrEdit(@idColor,@Descripcion)";

  pool.query(sql, [col.idColor, col.Descripcion], (err, rows, fields) => {
    if (!err)
      rows.forEach(element => {
        if (element.constructor == Array)
          res.send("Id de color insertado es: " + element[0].idColor);
      });
    else console.log(err);
  });
});

// Insertar un color

router.put("/", (req, res, next) => {
  let mod = req.body;
  const sql =
    "SET @idColor = ?; SET @Descripcion = ?; \
  CALL colorAddOrEdit(@idColor,@Descripcion);";

  pool.query(sql, [mod.idColor, mod.Descripcion], (err, row, fields) => {
    if (!err) res.send("Updated Succesfully");
    else console.log(err);
  });
});

module.exports = router;
