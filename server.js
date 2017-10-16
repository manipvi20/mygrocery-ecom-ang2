var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//task files
var index = require('./api-tasks/index');
var tasks = require('./api-tasks/tasks');

var app = express();
var port = 8080;

var router = express.Router();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//static folder
app.use(express.static(path.join(__dirname, 'views')));

//Body parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, function(){
    console.log('app running in ' + port);
})