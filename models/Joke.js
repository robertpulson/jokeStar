var mongoose = require('mongoose');

var JokeSchema = new mongoose.Schema({

  text: String
});

mongoose.model('Joke', JokeSchema);
