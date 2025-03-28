module.exports = (sequelize, Datatypes) => {
    const categoryModel = sequelize.define('Category', {
        id: {
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        name: Datatypes.STRING,
    },
        {
            tableName: 'categories',
            timestamps: false,
            underscored: true,
        });
    return categoryModel;
}
