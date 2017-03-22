/**
 * Created by unaisainz on 21/3/17.
 */
const http = require('http');
const config = require('./../config');
const parseXML = require('xml2js').parseString;

exports.scrap = function(url, cb) {

    http.get(url, function (res) {
        let body = "";


        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            // Got all response, now parsing...

            if (!body || res.statusCode !== 200)
                return cb({ message: "Invalid Feed" });

            parseXML(body, function (err, rss) {
                if (err)
                    return cb({ message: "Invalid Feed" });

                feed = parseRSS(rss);
                if (!feed)
                    feed = parseAtom(rss);
                if (!feed)
                    return cb({ message: "Invalid Feed" });
                cb(err, feed);
            });

        });

    }).on('error', function (error) {
        console.log("error while getting feed", error);
        cb(error, null);
    });


};

const parseRSS = function (rss) {
    try {
        let items = [];
        for (let i = 0; i < 3 && i < rss.rss.channel[0].item.length - 1; i++) {
            items.push({
                "title": rss.rss.channel[0].item[i].title[0],
                "link": rss.rss.channel[0].item[i].link[0],
                "description": rss.rss.channel[0].item[i].description[0]
            });

        }

        return {
            name: rss.rss.channel[0].title,
            description: rss.rss.channel[0].description,
            link: rss.rss.channel[0].link,
            items: items
        };
    }
    catch (e) { // If not all the fiels are inside the feed
        return null;
    }
};

const parseAtom = function (rss) {
    try {
        let items = [];
        for (let i = 0; i < config.maxItems && i < rss.feed.entry.length - 1; i++) {
            items.push({
                title: rss.feed.entry[i].title[0]._,
                link: rss.feed.entry[i].link[0].$.href,
                description: rss.feed.entry[i].content[0]._
            })
        }
        return {
            name: rss.feed.title,
            description: "No description",
            link: rss.feed.link[0].$.href,
            items: items
        };
    }
    catch (e) { // If not all the fiels are inside the feed
        console.log(e);
        return null;
    }
};