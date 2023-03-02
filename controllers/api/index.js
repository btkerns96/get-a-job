const router = require('express').Router();


const jobRoutes = require('./jobRoutes');
const userRoutes = require('./userRoutes');


router.use('/jobs', jobRoutes);
router.use('/user', userRoutes);

module.exports = router;