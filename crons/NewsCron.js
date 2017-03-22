/**
 * Created by unaisainz on 15/3/17.
 */

const naizUrl = 'http://www.naiz.eus/es/rss/news.rss';
const http = require('http');
const Feed = require('../models/Feed').model;
const Scrapper = require('./Scrapper');

module.exports = {

    getNewsNaiz: function () {
        Scrapper.scrap(naizUrl, function(err, feed){
            if(err) console.log(err);
            let feedToSave = new Feed(feed);
            feedToSave.save(function (err) {
                if(err) console.log(err);
                console.log("saved!");
            })
        })
    }
};
