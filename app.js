require('dotenv').config();
const PORT = process.env.PORT;

// express
const express = require('express');
const app = express();

// controllers
const user = require('./controllers/usercontroller');
const trails = require('./controllers/trailscontroller');

// import db
const sequelize = require('./db');
sequelize.sync(); // {force: true}  <-- this clears the db
app.use(express.json());

// middleware
app.use(require('./middleware/headers'));

// routes
app.use('/user', user);

// protected routes
// app.use(require('./middleware/validate-session'));
app.use('/trails', trails);

app.listen(PORT, () => console.log(`App has become self aware on Port ${PORT}`));