// ...existing code...
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;
const maxRetries = 10;
let attempt = 0;

function connectWithRetry() {
  attempt++;
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected:', mongoUrl);
  })
  .catch(err => {
    console.error(`MongoDB connection attempt ${attempt} failed:`, err.message || err);
    if (attempt >= maxRetries) {
      console.error('Max MongoDB connection attempts reached. Exiting.');
      process.exit(1);
    }
    const backoff = 5000; // ms
    console.log(`Retrying MongoDB connection in ${backoff/1000}s...`);
    setTimeout(connectWithRetry, backoff);
  });
}

connectWithRetry();