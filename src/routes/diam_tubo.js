const express = require("express");
const router = express.Router();

//variable para la conexion a base de datos
let pool = require("../database");

//obtener todos
router.get("/", function(req, res) {
  const sql = "SELECT * FROM Diam_tubo";
  pool.query(sql, function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      res.send(err);
    }
  });
});

//obtener uno por ID
router.get("/:idDiam_tubo", function(req, res, next) {
  const id = req.params.idDiam_tubo;
  const sql = `SELECT * FROM Diam_tubo WHERE idDiam_tubo=${id}`;
  pool.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: "Something failed!" });
    }
    res.json(row[0]);
  });
});

// borrar uno

router.delete("/:idDiam_tubo", (req, res, next) => {
  pool.query(
    `DELETE FROM Diam_tubo Where idDiam_tubo = ?`,
    [req.params.idDiam_tubo],
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
    "SET @idDiam_tubo = ?; SET @Descripcion = ?; \
  CALL diam_tuboAddorEdit(@idDiam_tubo, @Descripcion)";

  pool.query(sql, [col.idDiam_tubo, col.Descripcion], (err, rows, fields) => {
    if (!err)
      rows.forEach(element => {
        if (element.constructor == Array)
          res.send(
            "Id de diametro de tubo insertado es: " + element[0].idDiam_tubo
          );
      });
    else console.log(err);
  });
});

// Insertar un color

router.put("/", (req, res, next) => {
  let mod = req.body;
  const sql =
    "SET @idDiam_tubo = ?; SET @Descripcion = ?; \
  CALL diam_tuboAddOrEdit(@idDiam_tubo,@Descripcion);";

  pool.query(sql, [mod.idDiam_tubo, mod.Descripcion], (err, row, fields) => {
    if (!err) res.send("Updated Succesfully");
    else console.log(err);
  });
});

module.exports = router;
