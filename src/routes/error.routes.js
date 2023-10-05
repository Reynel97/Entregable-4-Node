const {
    errorLogger,
    errorHandler,
    notFoundErrorHandler,
    ormErrorHnadler,
    jwtErrorHandler,
} = require('../middlewares/errors.middleware')

const errorRoutes = (app) => {
    app.use(errorLogger);
    app.use(ormErrorHnadler)
    app.use(jwtErrorHandler);
    app.use(errorHandler);
    app.use(notFoundErrorHandler);
}


module.exports = errorRoutes;