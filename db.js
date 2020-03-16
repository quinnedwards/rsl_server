const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('database is connected'))
    .catch(err => console.log(err));

    User = sequelize.import('./models/user');
    Rating = sequelize.import('./models/rating');

    Rating.belongsTo(User);
    User.hasMany(Rating);

module.exports = sequelize;