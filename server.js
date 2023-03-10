//Sequelize is an ORM (Object-Relational Mapping) package for Node. js that works with a variety of SQL based databases such as Postgres, MySQL, SQLite, and a few others. 
//SQL is a query language used for querying and interacting with a variety of databases

// The dotenv is used to keep passwords, API keys, and other sensitive data out of your code. 
// It allows you to create environment variables in a . env file instead of putting them in your code.
require('dotenv').config();

// This will set up Node.js's Express static paths, path module provides utilities for working with file and directory paths
const path = require('path');

// This will give access to the express and express-handlebars modules.
// Express = Fast, unopinionated, minimalist web framework for Node.js
// Handlebars is a simple templating language. It uses a template and an input object to generate HTML or other text formats.
const express = require('express');
const exphbs = require('express-handlebars');

// Express-session - an HTTP server-side framework used to create and manage a session middleware.
// Express-session stores only a session identifier on the client within a cookie and stores the session data on the server, typically in a database
// REF: http://expressjs.com/en/resources/middleware/session.html  
const session = require('express-session');

// This is where the server.js will access the Express Routes
const routes = require('./controllers');

const helpers = require('./utils/helper');
//const withAuth = require('./utils/auth');

// Set up an Express App
const app = express();
const PORT = process.env.PORT || 3001;

// connect-session-sequelize is a SQL session store using Sequelize.js.
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//Sets up the connection of Sequelize
const sequelize = require('./config/connection');




// Set up session storage with Sequelize
const sess = {
    secret: 'Super secret secret',
    // http://expressjs.com/en/resources/middleware/cookie-session.html
    // https://medium.com/@alysachan830/cookie-and-session-ii-how-session-works-in-express-session-7e08d102deb8
    cookie: {
        //     // Stored in milliseconds
        //     // (86400000 ms === 1 day)
        //     // (3600000 ms === 1 hour)
        //maxAge: 3600000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Creates 'Express-Handlebars' with a default layout
const hbs = exphbs.create({
    helpers
});


// Stores user data between HTTP requests. It creates a new session for the user and assigns them a cookie. 
app.use(session(sess));


app.engine('handlebars', hbs.engine);  // Sets handlebars configurations.
app.set('view engine', 'handlebars');  // Set Handlebars as the default template engine.


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files. 
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes.
//app.use(withAuth);
app.use(routes);

// Syncs sequelize models to the database, then starts the Express.js server.
sequelize.sync({ force: false }).then(() => {
    // Force false so data doesn't get dropped on every sync.
    app.listen(PORT, () => console.log('Now listening'));
});