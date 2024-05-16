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

  router.get('/tracker', async (req, res) => {
    try {
      res.render('tracker', {
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  module.exports = router;