var express = require("express");
var GoogleMapsAPI = require("googlemaps");

var app = express();
var path = require("path");
var MongoClient = require('mongodb').MongoClient;
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


    var publicConfig = {
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
    });
});



var port = 3000;
app.listen(port, function() {
    console.log("Server is running...");
    MongoClient.connect("mongodb://admin:admin@ds039195.mongolab.com:39195/berkedeneme", function(err, db) {
        if(!err) {
            console.log("Database connection established");
            berkedeneme = db;
            var col =  berkedeneme.collection("addresses");

            col.find({"address":"ankara"}).toArray(function(err,result){
                //console.log(result[0].address);
                address = result[0].address;

            });
        }
        else{
            console.log(err.message);
        }
    });
});
