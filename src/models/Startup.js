const { model, Schema } = require('mongoose');

const StartupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  founders: {
    type: [String],
    required: true
  },
  team: [String],
  description: {
    type: String,
    required: true
  },
  market: {
    type: String,
    required: true
  },
  target_audience: {
    type: String,
    required: true
  },
  stage: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  lat: Number,
  long: Number
}, {
  timestamps: true
});

module.exports = model('Startup', StartupSchema);