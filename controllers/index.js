const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Prefix all routes defined in the api directory with `/api`.

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;