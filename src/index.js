const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//inicializaciones
const app = express();

const modeloRouter = require("./routes/modelo");
const colorRouter = require("./routes/color");
const Diam_tuboRouter = require("./routes/diam_tubo");
const productoRouter = require("./routes/productos");

//configuraciones
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Dominio que tengan acceso (ej. 'http://example.com')
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Metodos de solicitud que deseas permitir
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

//variables globales

//rutas
app.use("/api", require("./routes/index"));
app.use("/api/modelo", modeloRouter);
app.use("/api/color", colorRouter);
app.use("/api/diam_tubo", Diam_tuboRouter);
app.use("/api/producto", productoRouter);

//archivos publicos

//iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
