// set up Express router
const router = require('express').Router()

// set up route files here
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// then set up Express router with all routes
// /api/users
router.use('/users', userRoutes);
// router.use('/dashboard', dashboardRoutes);
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes);

// export
module.exports = router;