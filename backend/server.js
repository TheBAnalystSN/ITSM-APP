require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

console.log('MONGO_URI:', process.env.MONGO_URI);

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started');
});
