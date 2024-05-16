const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const session = require('express-session');
const PORT = process.env.PORT || 3001;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sets up session and connect to our Sequelize db
// Configure and link a session object with the sequelize store
const sess = {
    secret: 'Super secret secret',
    // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
    cookie: {
        // maxAge sets the maximum age for the cookie to be valid. Here, the cookie (and session) will expire after one hour. The time should be given in milliseconds.
        maxAge: 300000,
        // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
        httpOnly: true,
        // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
        secure: false,
        // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    // Sets up session store
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

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
