var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
//var bootstrap = require('bootstrap');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth/users');
var loginRouter = require('./routes/auth/login');
var insertSuspRouter = require('./routes/insertSusp');
var selectSuspRouter = require('./routes/selectSusp');
var insertVRouter = require('./routes/insertV');
var selectVRouter = require('./routes/selectV');
var formVRouter = require('./routes/form_insertV');

var app = express();
var upload = multer()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/insertSusp', insertSuspRouter);
app.use('/selectSusp', selectSuspRouter);
app.use('/insertV', insertVRouter);
app.use('/selectV', selectVRouter);
app.use('/form_insertV', formVRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 3000; 

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

module.exports = app;
