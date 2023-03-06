const router = require('express').Router();
const { JobPosts, User } = require('../models');

// GET all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobPostData = await JobPosts.findAll();
    res.status(200).json(jobPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});





router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const jobdata = await JobPosts.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: JobPosts,
        },
      ],
      
    });

    // Serialize data so the template can read it
    const jobs = jobdata.map((jobPosts) => jobPosts.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      jobs, 
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET a single job
// router.get('jobs/:id', async (req, res) => {
//   try {
//     const jobPostData = await JobPosts.findByPk(req.params.id, {

//     });

//     if (!jobPostData) {
//       res.status(404).json({ message: 'No job found with this id!' });
//       return;
//     }

//     res.status(200).json(jobPostData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
