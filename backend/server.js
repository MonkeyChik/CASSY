// server file

const mongoose = require('mongoose')

// connect to MongoDB database:
mongoose.connect('*** ? ***', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// replace '*** ? ***' with connection string

// schema:
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

// model:
const User = mongoose.model('User', userSchema);
