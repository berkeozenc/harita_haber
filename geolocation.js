require('./core/mongoose');

var mongoose = require('mongoose');
var GoogleMapsAPI = require("googlemaps");
var Address = mongoose.model('Address');

var GeoLocation = {

    publicConfig: {
        key: process.env.API_KEY,
        stagger_time:       1000,
        encode_polylines:   false,
        secure:             false
    },
    find: function(address, callback) {
        Address.findOne({text: address}, function(err, addressResult) {
            if (err) {
                console.log("Error occurred while checking existence address: ", address);
            } else {
                if (addressResult != null) {
                    callback(addressResult)
                } else {
                    var gmAPI = new GoogleMapsAPI(this.publicConfig);
                    var geocodeParams = {
                        "address":    address
                    };

                    gmAPI.geocode(geocodeParams, function(err, result){
                        console.log(address, result);
                        callback({
                            address: address,
                            location: result.results[0].geometry.location
                        });
                    });
                }
            }
        });
    }
};

module.exports = GeoLocation;