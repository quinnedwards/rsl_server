module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('rating', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Rating;
}