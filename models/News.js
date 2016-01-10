var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: String,
    description: String,
    site: {type: Schema.Types.ObjectId, ref: 'Site'},
    address: {type: Schema.Types.ObjectId, ref: 'Address'}
});

var News = mongoose.model('News', NewsSchema);

module.exports = News;