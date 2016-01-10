var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
    name: String,
    code: String,
    parser: String
});

var Site = mongoose.model('Site', SiteSchema);

module.exports = Site;