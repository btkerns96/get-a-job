const router = require('express').Router();
const { JobPosts, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const jobdata = await JobPosts.findAll({
   
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

// GET all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobPostData = await JobPosts.findAll();
    res.status(200).json(jobPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: JobPosts }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('signup');
});

router.get('/about', (req, res) => {
 res.render('about')

});

router.get('/contactUs', (req, res) =>{
  res.render('contactUs')
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
