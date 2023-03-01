const router = require('express').Router();
const { Project } = require('../models');

// Render the homepage
router.get('/', async (req, res) => {
  try {
    const jobData = await Project.findAll({
      order: [['date_created', 'DESC']],
      limit: 10,
    });
    const jobs = jobData.map((job) => job.get({ plain: true }));
    res.render('homepage', { jobs });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
