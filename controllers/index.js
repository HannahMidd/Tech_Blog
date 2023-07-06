const router = require('express').Router();

const apiRoutes = require('./api');
const viewRoutes = require('./dashboardRoutes');
const viewRoutes = require('./homepageRoutes');

router.use('/', homepageRoutes);
router.use('/api', apiRoutes);
router.use('/', dashboardRoutes);

module.exports = router;
