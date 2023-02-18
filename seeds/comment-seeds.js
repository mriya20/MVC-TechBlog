const { Comment } = require('../models');

const commentData = [
    {
        "comment_body": "GREAT IDEA!",
        "post_id": 1,
        "user_id": 1
    },
    {
        "comment_body": "TOTALLY AGREE",
        "post_id": 2,
        "user_id": 2
    },
    {
        "comment_body": "BEST YET!",
        "post_id": 3,
        "user_id": 3
    },
    {
        "comment_body": "NEEDS TO UPGRADE!",
        "post_id": 4,
        "user_id": 4
    },
    {
        "comment_body": "GET A REAL JOB",
        "post_id": 5,
        "user_id": 5
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;