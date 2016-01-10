require('./core/mongoose');


var mongoose = require('mongoose');
var Address = mongoose.model('Address');
var Searcher = require('./searcher');
var GeoLocation = require('./geolocation');

var Site = mongoose.model('Site');

Site.find({}, function(err, sites) {
    if (err) {
        console.log("Error occurred while getting site list");
    } else {
        var addressList = [];
        for (var i in sites) {
            var site = sites[i];
            addressList = addressList.concat(Searcher.search(site));
        }

        for (var k in addressList) {
            var address = addressList[k];
            GeoLocation.find(address, function(geLocation) {
                var addressModel = new Address({
                    text: geoLocation.address,
                    locations: [geoLocation.location.lat, geoLocation.location.lng]
                });
                addressModel.save(function(err) {
                    if (err) {
                        console.log("Error occurred while saving address: ", addressModel);
                    } else {
                        console.log("Address saved successfully!");
                    }
                });
            });

        }

    }
});