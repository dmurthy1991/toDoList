var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoListSchema = new Schema({
  item: String,
  priority: String
});
module.exports = mongoose.model('To Do List', todoListSchema);