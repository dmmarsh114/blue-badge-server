const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME, 'postgres', process.env.DBPASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log(`Connected to ${process.env.DBNAME} postgres database`))
    .then(err => err ? console.log(err) : console.log('no errors here!'))

const User = sequelize.import('./models/user');
const Trail = sequelize.import('./models/trails');

User.hasMany(Trail);
Trail.belongsTo(User);

module.exports = sequelize;