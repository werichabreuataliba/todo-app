const mongoose = require('mongoose')
//mongoose.Promise = mongoose.Promise
module.exports = mongoose.connect('mongodb://localhost/todo')