const express = require('express');
const passport = require('../config/ppConfig');
const router = express.Router();

// import database
const db = require('../models');

router.get('/signup', (req, res) => {
  res.render('resident/signup'); // this is a form
});

router.get('/login', (req, res) => {
  res.render('resident/login'); // this is a form
});

router.get('/logout', (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash('success', 'Logging out... See you next time!');
  res.redirect('/');
});


// What routes do we need (post routes)
router.post('/signup', (req, res) => {
  // we now have access to the user info (req.body);
  // console.log(req.body);
  const { name, age, license, email, username, password } = req.body; // goes and us access to whatever key/value inside of the object (req.body)
  db.resident.findOrCreate({
    where: { username },
    defaults: { name, age, license, email, password }
  })
  .then(([resident, created]) => {
    if (created) {
      // if created, success and we will redirect back to / page
      console.log(`${resident.name} was created....`);
      // flash messages
      const successObject = {
        successRedirect: '/',
        successFlash: `Welcome ${resident.name}. Account was created and logging in...`
      }
      // passport authenicate
      passport.authenticate('local', successObject)(req, res);
    } else {
      // Send back email already exists
      req.flash('error', 'Username already exists');
      res.redirect('/resident/signup');
    }
  })
  .catch(error => {
    console.log('**************Error');
    console.log(error);
    req.flash('error', 'Either username or password is incorrect. Please try again.');
    res.redirect('/resident/signup');
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/resident/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either username or password is incorrect' 
}));


module.exports = router;