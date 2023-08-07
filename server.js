require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/config.js'); // Import the Sequelize instance

// Initialize a new SequelizeStore and pass the sequelize instance to it
// const sessionStore = new SequelizeStore({
//     db: sequelize,
// });
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./controllers'));

sequelize
    .sync({ force: false })
    .then(() => app.listen(process.env.PORT || 3001))
    .catch((err) => console.error(err));
