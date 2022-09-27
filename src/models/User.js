module.exports = (sequelize, DataTypes) => {
    const userModel = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING
    },
        {
            tableName: 'users',
            underscored: true,
            timestamps: false
        });
    return userModel;
};
