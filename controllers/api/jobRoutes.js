const router = require('express').Router();
const { JobPosts } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobPostData = await JobPosts.findAll();
    res.status(200).json(jobPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all job posts and include user 
// router.get('/jobs', async (req, res) => {
//   try {
//     const jobData = await JobPosts.findAll({
//       include: [{ model: User }],
//     });
//     const jobs = jobData.map((job) => job.get({ plain: true }));
//     res.render('jobs', { jobs });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const jobData = await JobPosts.findAll();
//     res.status(200).json(jobData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Get a single job post by id and include user 
// router.get('/:id', async (req, res) => {
//   try {
//     const jobData = await JobPosts.findByPk(req.params.id, {
//       include: [{ model: User }],
//     });
//     const job = jobData.get({ plain: true });
//     res.render('job', { job });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Render the new job post form
// router.get('/jobs/new', withAuth, (req, res) => {
//   res.render('new-job');
// });

// Create a new job post
// router.post('/new', ChckAuth, async (req, res) => {
//   try {
//     const jobData = await JobPosts.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });
//     res.status(200).json(jobData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
