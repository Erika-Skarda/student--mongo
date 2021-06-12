require('./models/db');

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');

const studentController = require('./controllers/studentController');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send(`
  <h2>Welcome to Students Database!</h2>
  <h3>Click here to access the <b><a href="/student/list">Database</a></b></h3>
  `);
});

// app.set('views', path.join(__dirname, '/views/'));

// app.engine('hbs', exphbs({
//     handlebars: allowInsecurePrototypeAccess(handlebars),
//     extname: "hbs",
//     defaultLayout: "MainLayout",
//     layoutsDir: __dirname + "/views/layouts/"
//   })
// );

app.engine('handlebars', exphbs({
  handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', 'handlebars');

app.listen(3001, () => {
  console.log('Server started at port 3001');
});

app.use('/student', studentController);