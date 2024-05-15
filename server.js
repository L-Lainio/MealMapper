const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const routes = require('./routes/index');
const hbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes
app.use('/', routes);

// Serve static files
app.use(express.static('public'));

app.set('view engine', 'hbs');

// Define route handler for the homepage
app.get('/', (req, res) => {
    res.render('/layouts/main.handlebars');
});

// Sync database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Error syncing database:', err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
