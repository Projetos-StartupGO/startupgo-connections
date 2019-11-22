const mongoose = require('mongoose');
let dbURI = 'mongodb+srv://lucashenrique:ZSegojtekoqghRMD@cluster0-h6qbp.mongodb.net/StarTinder?retryWrites=true&w=majority';

// Avoiding deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to:', dbURI);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// For closing the connection on any platform
const shutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through', msg);
    callback();
  });
};

// For app termination
process.once('SIGINT', () => {
  shutdown('app termination', () => {
    process.kill(process.pid, 'SIGINT');
  });
});

// For heroku app termination
process.once('SIGTERM', () => {
  shutdown('heroku app termination', () => {
    process.kill(process.pid, 'SIGTERM');
  });
});
