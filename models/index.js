// Requires the Models for each
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// The user has many posts which will be identified by the user_id
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// A post belongs to a User which will be shown in the bost by the user_id
// If the user was to delete all posts by that user will "cascade" and delete also
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});
//Comments belong to a User again will delete if user is deleted
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});
// Comments will also belong to a post which will identify using the post_id
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});
// A user can have many comments which will also delete if user is deleted
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});
// A post can have many comments which will delete if post deleted
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

module.exports = {
    User,
    Comment,
    Post
};
