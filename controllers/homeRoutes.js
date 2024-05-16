const router = require('express').Router();
const withAuth = require('../utils/auth');
const {  User } = require('../models');

router.get('/', async (req, res) => {
    try {
      res.render('homepage', {
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/planner', withAuth, async (req, res) => {
    try {
      res.render('planner', {
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/LoginSignup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/planner');
      return;
    }
  
    res.render('loginSignup');
  });

  router.get('/tracker', withAuth , async (req, res) => {
    try {
      res.render('tracker', {
        logged_in: req.session.logged_in 
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