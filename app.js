const http=require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const mongoose = require('mongoose');
const Employee = require('./models/employee')

const user = '7522dd87240d17f181db2307eac5e29b'
const password = 'test'
const database = '7522dd87240d17f181db2307eac5e29b'

const uri = `mongodb://${user}:${password}@11b.mongo.evennode.com:27018/${database}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useMongoClient: true, });

const db = mongoose.connection;

db.on('error', function (err) {
  console.log(err.errmsg);
});

db.on('connected', function () {
  console.log("mongodb connected");
});

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'assets')))

app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

app.use('/employee',require('./routes/employee.route'))


http.createServer(app).listen(process.env.PORT || 3000)