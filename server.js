const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://perduej7:1jyvk9jlzgkhhC8Z@cluster0.yjfhzdv.mongodb.net/journalDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI);

const entrySchema = new mongoose.Schema({
  text: String,
  icons: [String],
  date: String,
  username: String,
});

const Entry = mongoose.model('Entry', entrySchema);

// Routes
app.get('/entries', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/entries', async (req, res) => {
  const entry = new Entry({
    text: req.body.text,
    icons: req.body.icons,
    date: req.body.date,
    username: req.body.username,
  });

  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
