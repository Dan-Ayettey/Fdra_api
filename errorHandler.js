
const error404Handler=async function (req, res, next) {
    // catch 404 and forward to error handler
       await res.status('404').json({fail:'Not found, check url and method'});
       next();
};

// error handler
const error500Handler=async function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        err.option='Check url or method';
        await res.status(err.status || 500).json({error:err});
        next();
};

module.exports={
    error404Handler,
    error500Handler
}
