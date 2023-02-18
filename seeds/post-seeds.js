const { Post } = require('../models');

const postData = [
    {
        "title": "Design Tech",
        "post_content": "Maple is a stylish and exceptionally made accessory",
        "user_id": 1
    },
    {
        "title": "TechTechno",
        "post_content": "We love a lot of innovative sound engineering",
        "user_id": 2
    },
    {
        "title": "Google Assistant",
        "post_content": "The standout feature makes a connected home.",
        "user_id": 3
    },
    {
        "title": "Footprint",
        "post_content": "Optional cellular network connectivity!!",
        "user_id": 4
    },
    {
        "title": "Gadget4U",
        "post_content": "The accessory has a minimalist design and exceptional build quality.",
        "user_id": 5
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;