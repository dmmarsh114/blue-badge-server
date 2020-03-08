module.exports = (sequelize, DataTypes) => {
    const Trail = sequelize.define('trail', {
        name: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.JSON, allowNull: false },
        difficulty: { type: DataTypes.STRING, allowNull: true },
        rating: { type: DataTypes.INTEGER, allowNull: true },
        notes: { type: DataTypes.STRING, allowNull: true }
    })
    return Trail;
}