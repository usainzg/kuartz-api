/**
 * Created by unaisainz on 22/3/17.
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User').model;

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

router.get('/:token', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const obj = {
        'token': req.params.id
    };
    res.end(JSON.stringify(obj));
});

router.post('/', function (req, res) {
    console.log("HOLA DESDE POST");
    console.log(req.body);
});

module.exports = router;