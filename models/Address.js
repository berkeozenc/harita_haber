var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    text: String,
    coordinates: [String]
});

var Address = mongoose.model('Address', addressSchema);

module.exports = Address;