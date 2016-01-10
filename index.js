var express = require("express");
var GoogleMapsAPI = require("googlemaps");
var mongoose = require('mongoose');


var app = express();
var path = require("path");

require('./core/mongoose');

var Address = mongoose.model('Address');


var berkedeneme;
var address;


var publicConfig = {
    key: process.env.API_KEY,
    stagger_time:       1000,
    encode_polylines:   false,
    secure:             false
};
var gmAPI = new GoogleMapsAPI(publicConfig);


app.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/load', function(req, res, next) {

    Address.find({}, function(err, addresses) {
        if (err) {
            console.log("Error occurred while gettind addresses: ", err);
            res.status(500).json({
                success: false,
                data: "Technical error occurred"
            });
        } else {
            res.status(200).json({
                succces: true,
                data: addresses
            });
        }
    });
    /*var publicConfig = {
        key: process.env.API_KEY,
        stagger_time:       1000,
        encode_polylines:   false,
        secure:             false
    };
    var gmAPI = new GoogleMapsAPI(publicConfig);

    var geocodeParams = {
        "address":    address
    };

    gmAPI.geocode(geocodeParams, function(err, result){
        if (err) {
            res.json({
                success: false,
                data: err.message
            });
        } else {
            res.json({
                success: true,
                data: result
            })
        }
    });*/
});



var port = 3000;
app.listen(port, function() {
    console.log("Server is running...");
});
