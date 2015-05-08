var mongoose = require('mongoose');

var JokeSchema = new mongoose.Schema({

  text: String,
  stars: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

JokeSchema.methods.addstar = function(cb, stars) {
  this.stars += 1;
  this.score += stars;
  this.save(cb);
};

mongoose.model('Joke', JokeSchema);
