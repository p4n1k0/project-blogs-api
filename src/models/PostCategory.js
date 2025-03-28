module.exports = (sequelize, DataTypes) => {
    const postCategoryModel = sequelize.define('PostCategory', {
        postId: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        categoryId: {
            primaryKey: true,
            type: DataTypes.INTEGER
        }
    },
        {
            tableName: 'posts_categories',
            timestamps: false,
            underscored: true
        });
    postCategoryModel.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: postCategoryModel,
            foreignKey: 'postId',
        });
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blog_posts',
            through: postCategoryModel,
            foreignKey: 'categoryId',
        });        
    }
    return postCategoryModel;
};
