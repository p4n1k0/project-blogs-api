module.exports = (sequelize, DataTypes) => {
    const postCategoryModel = sequelize.define('PostCategory', {
        postId: {
            foreignKey: true,
            type: DataTypes.INTEGER
        },
        categoryId: {
            foreignKey: true,
            type: DataTypes.INTEGER
        }
    },
        {
            tableName: 'posts_categories',
            timestamps: false,
            underscored: true
        });
    postCategoryModel.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blogPost',
            through: postCategoryModel,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });
        models.BlogPost.belongsToMany(models.Category, {
            as: 'category',
            through: postCategoryModel,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
    }
    return postCategoryModel;
};
