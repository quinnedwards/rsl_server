const Sequelize = require('sequelize');
const sequelize = new Sequelize('recordstoreserver', 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('database is connected'))
    .catch(err => console.log(err));

// Rating = sequelize.import('./models/rating');
// User = sequelize.import('./models/user');

// Rating.belongsTo(User);
// User.hasMany(Rating);

module.exports = sequelize;