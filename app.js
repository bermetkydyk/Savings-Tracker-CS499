const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const key = require('./config/keys');

const app = express();

app.use(bodyParser.json());

// Enable Cookies
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [key.cookieKey.key]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Database Setup
//Database 
const db = require('./config/database');
const keys = require('./config/keys');

//test the database
db.authenticate()
.then(() => console.log('Database connected!'))
.catch(err => console.log('Error: ' + err))

//user routes
app.use('/users', require('./routes/userRoutes'));


// Routes Setup
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

// create home route
// app.get('/', (req, res) => {
//     res.render('home');
// });

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started OK on port ${PORT}`));
