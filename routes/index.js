var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = mongoose.model('User');
var Joke = mongoose.model('Joke');
var jwt = require('express-jwt');

var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/register', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Please 'Phil' out all fields" });
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)

  user.save(function (err) {
    if(err) { return next(err); }
    return res.json({ token: user.generateJWT() })
  });
});

router.post('/login', function (req, res, next){
  if (!req.body.username || !req.body.password){
    return res.status(400).json({message: "Please 'Phil' out all fields" });
  }

  passport.authenticate('local', function(err, user, info){
    if (err) { return next(err); }

    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.get('/users', function (req, res, next) {
  User.find(function (err, users) {
    if(err){ return(err); }
    res.json(users);
  });
});

router.param('joke', function (req, res, next, id) {
  var query = Joke.findById(id);

  query.exec(function (err, joke) {
    if (err)   { return next(err); }
    if (!joke) { return next(new Error("Can't find joke")); }

    req.joke = joke;
    return next();
  });
});

router.get('/jokes', function (req, res, next) {
  Joke.find({})
  .populate('user')
  .exec(function (err, jokes) {
    if(err){ return(err); }
    res.json(jokes);
  });
});

router.post('/jokes', auth, function (req, res, next) {
  var joke = new Joke(req.body);
  joke.user = req.payload._id;

  joke.save(function (err, joke) {
    if(err){ return next(err); }
    res.json(joke);
  });
});

router.put('/jokes/:joke/addstar', auth, function (req, res, next) {
  req.joke.addstar(function (err, joke) {
    if (err) { return next(err); }
    res.json(joke);
  });
});

module.exports = router;
