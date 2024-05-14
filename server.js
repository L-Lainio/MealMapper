require('dotenv').config()
const express = require('express')
const app = express()
const expbs = require('express-handlebars')
const path = require('path');
const routes = require('./controllers');

const PORT = process.env.PORT ?? 3000

app.use(express.static('public'));

const hbs = expbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))
