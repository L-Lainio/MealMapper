const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes
app.use(routes);

// Serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static middleware pointing to the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Define route handler for the homepage


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
