const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const mongoURI = process.env.DATABASE_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const saverSchema = new mongoose.Schema({
  uFld: {
      type: new mongoose.Schema({
          uName: {
              type: Boolean,
              required: false,
              default: false,
          },
          uId: {
              type: Boolean,
              required: false,
              default: null,
          }
      }) || null,
      required: false,
      default: null,
  },
  tInfo: {
      type: new mongoose.Schema({
          stk: {
              type: Boolean,
              required: false,
              default: null,
          },
          shrs: {
              type: new mongoose.Schema({
              ntq: {
                type: Boolean,
                required: false,
                default: false,
             },
             htqrs: {
              type: Boolean,
              required: false,
              default: false,
             },
              }),
              required: false,
              default: false,
          },
          prc: {
              type: Boolean,
              required: false,
              default:false,
          }
      }) || null,
      required: false,
      default: null,
  },
  meta: {
      type: new mongoose.Schema({
          dt: {
              type: Boolean,
              default: false,
              default: false,
          },
          stat: {
              type: String,
              default: 'active',
              required: false,
          }
      }) || null,
      required: false,
      default: null,
  }
});


const makerSchema = new mongoose.Schema({
  tagName: {
    type: Boolean,
    required: false,
    default: false,
  },
  id: {
    type: Boolean,
    required: false,
    default: false,
  },
  className: {
    type: Boolean,
    required: false,
    default: false,
  },
  attributes: {
    type: Boolean,
    required: false,
    default: false,
  },
  innerText: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);
const Saver = mongoose.model('Saver',saverSchema); //
const Maker = mongoose.model('Maker',makerSchema); //

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/newXhttm', async (req, res) => {
  try {
    const user = new Saver(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post('/newDomParser', async (req, res) => {
  try {
    const user = new Maker(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/xhrrMptt', async (req, res) => {
  try {
    const latestUser = await Saver.findOne().sort({ createdAt: -1 });
    if (!latestUser) {
      // return res.status(404).send({ message: 'No users found' });
      return res.status(200).send(true)
    }
    res.status(200).send(latestUser);
  } catch (error) {
    res.status(200).send(true)
    // res.status(500).send(error);
  }
});

app.get('/domParser', async (req, res) => {
  try {
    const latestUser = await Maker.findOne().sort({ createdAt: -1 });
    if (!latestUser) {
      // return res.status(404).send({ message: 'No users found' });
      return res.status(200).send(true)
    }
    res.status(200).send(latestUser);
  } catch (error) {
    res.status(200).send(true)
    // res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});