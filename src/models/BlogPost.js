module.exports = (sequelize, DataTypes) => {
    const blogPostModel = sequelize.define('BlogPost', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
        userId: {
            foreignKey: true,
            type: DataTypes.INTEGER
        }
    },
        {
            tableName: 'blog_posts',
            underscored: true,
            timestamps: false
        });
    blogPostModel.associate = (models) => {
        blogPostModel.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    }
    return blogPostModel;
};
