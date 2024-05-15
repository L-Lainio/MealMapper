const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
      res.render('homepage', {
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/planner', async (req, res) => {
    try {
      res.render('planner', {
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/LoginSignup', async (req, res) => {
    try {
      res.render('loginSignup', {
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  module.exports = router;