const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scrapper = require('../crons/Scrapper');

// Defining schema for our News API
const FeedSchema = Schema({
    url: String,
    name: { type: String, default: "Loading..." },
    description: { type: String, default: "Loading..." },
    link: { type: String, default: "Loading..." },
    items: [{
        title: String,
        link: String,
        description: String,
        content: String
    }]
});

//Exporting our model
const FeedModel = mongoose.model('Feed', FeedSchema);

exports.model = FeedModel;

exports.add = function (url, cb) {
    feed = new FeedModel({url: url});
    scrapper.scrap(feed, function (err, rss) {
        if(err) return cb(err);

        for(let i in rss) feed[i] = rss[i];
    });
    FeedModel.save(function (err) {
        if(err) console.log(err);
        console.log("new created");
    })
};

exports.getFeed = function () {
    FeedModel.findOne(function (err, res) {
        if(err) console.log(err);
        console.log(res);
    })
};


