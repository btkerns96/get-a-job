const router = require('express').Router();
const { Project, User } = require('../models');
const ChckAuth = require('../utils/auth');

// Get all job posts and include user 
router.get('/', async (req, res) => {
  try {
    const jobData = await Project.findAll({
      include: [{ model: User }],
    });
    const jobs = jobData.map((job) => job.get({ plain: true }));
    res.render('jobs', { jobs });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single job post by id and include user 
router.get('/:id', async (req, res) => {
  try {
    const jobData = await Project.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    const job = jobData.get({ plain: true });
    res.render('job', { job });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the new job post form
router.get('/new', ChckAuth, (req, res) => {
  res.render('new-job');
});

// Create a new job post
router.post('/new', ChckAuth, async (req, res) => {
  try {
    const jobData = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(jobData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;