var mongoose = require('mongoose');

var StarSchema = new mongoose.Schema({

  score: type: Number,
  joke: { type: mongoose.Schema.Types.ObjectId, ref: 'Joke' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Star', StarSchema);
