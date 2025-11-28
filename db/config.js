const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || 'mongodb://172.27.0.1:27017/e-comm';
console.log('MongoDB URL:', mongoUrl);

const maxRetries = Number(process.env.MONGO_MAX_RETRIES) || 10;
const retryDelay = Number(process.env.MONGO_RETRY_DELAY_MS) || 5000;
let attempt = 0;

mongoose.set('bufferCommands', false);
mongoose.set('bufferTimeoutMS', 0);

function connectWithRetry() {
  attempt++;
  console.log(`MongoDB connection attempt ${attempt} to ${mongoUrl}`);

  mongoose.connect(mongoUrl)
    .then(() => {
      console.log('MongoDB connected:', mongoUrl);
    })
    .catch(err => {
      console.error(`MongoDB connection attempt ${attempt} failed:`, err.message || err);
      if (attempt >= maxRetries) {
        console.error('Max MongoDB connection attempts reached. Exiting.');
        process.exit(1);
      }
      setTimeout(connectWithRetry, retryDelay);
    });
}

connectWithRetry();

module.exports = mongoose;