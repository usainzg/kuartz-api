/**
 * Created by unaisainz on 15/3/17.
 */

const express = require('express');
const router = express.Router();
const Feed = require('../models/Feed').model;

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    let items = [];
    Feed.findOne(function(err, feed) {
        if (err) return handleError(err);
        res.send(feed['items']);
    })

});

router.get('/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const obj = {
        'id': req.params.id
    };
    res.end(JSON.stringify(obj));
});

module.exports = router;
