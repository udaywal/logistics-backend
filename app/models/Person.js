/**  Module Dependencies **/
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String },
  time: { type: String },
  stream: [
    {
        name: { type: String, default: '' },
        origin: { type: String, default: '' },
        destination: { type: String, default: '' },
        timestamp:  { type: Date, default: Date.now }
    }
  ],
})

module.exports = mongoose.model('Person', personSchema);