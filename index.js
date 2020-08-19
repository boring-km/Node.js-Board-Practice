var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// DB Setting
require('./database/db')();

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/home'));

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});