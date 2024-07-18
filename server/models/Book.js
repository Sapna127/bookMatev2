const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  publication: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String, required: true },
  pictures: [{ type: String }],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Book', bookSchema);
