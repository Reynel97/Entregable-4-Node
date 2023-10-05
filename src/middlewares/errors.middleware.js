const fs = require("node:fs/promises");
const path = require("node:path");
const {
  ConnectionError,
  ValidationError,
  DatabaseError,
} = require("sequelize");

//necesitamos un middleware para mostrar errores en la consola

const errorLogger = (err, req, res, next) => {
  const date = new Date().toLocaleString();
  console.log(err);
  const filePath = path.join(__dirname, "../logs/logs.txt");
  fs.appendFile(
    filePath,
    `====================ERROR  ${date}=========================\n`
  );
  fs.appendFile(filePath, JSON.stringify(err) + "\n\n");
  next(err);
};

const ormErrorHnadler = (err, req, res, next) => {
  //aqui llega un error lanzado en un controlador
  //varificamos si este error fue creado con la clase connection error
  if (err instanceof ConnectionError) {
    return res.status(409).json({
      error: "database connection error",
      message: err.name,
    });
  }
  //verificamos si el error fue creado con laclase ValidationError
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: err.name,
      message: err?.original?.detail,
      errors: err.errors,
    });
  }
  if (err instanceof DatabaseError) {
    return res.status(409).json({
      error: err.name,
      message: err.message,
      errors: err.errors,
    });
  }

  next(err);
};

const jwtErrorHandler = (err, req, res, next) => {
  const jwtErrors = ["TokenExpiredError", "JsonWebTokenError"];

  if (jwtErrors.includes(err.name)) {
    return res.status(401).json({
      error: err.name,
      message: err.message,
    });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const { status, ...error } = err;
  res.status(status || 500).json(error);
};

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    error: "Not found",
    message: "The requested resource is not into the server",
  });
};

module.exports = {
  errorLogger,
  errorHandler,
  notFoundErrorHandler,
  ormErrorHnadler,
  jwtErrorHandler
};
