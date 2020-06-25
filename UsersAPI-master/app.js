var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var fs = require('fs');
var multiparty = require('connect-multiparty');
var multipartMiddleware =multiparty();
var cors = require('cors');
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/uploadFile', multipartMiddleware, function(req, resp) {
    
  var file = req.files.file;
  var tmp_path = file.path;
  var target_path = './public/images/' + file.name;
  console.log(tmp_path);
  console.log(target_path);

  

  fs.copyFile(tmp_path,target_path,function(err)
  {
      if (err) throw err;        
      fs.unlink(tmp_path, function() {
        if (err) throw err;
        resp.status(200).send('File uploaded to: ' + target_path);          
      });
          
  });    

         
});



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

module.exports = app;
