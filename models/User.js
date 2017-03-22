/**
 * Created by unaisainz on 22/3/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scrapper = require('../crons/Scrapper');

// Defining schema for our News API
const UserSchema = Schema({
    token: String,
    name: { type: String, default: "Default Name" },
    description: { type: String, default: "Phone Description" },
    news : { type: Array, default: [] }
});

//Exporting our model
const UserModel = mongoose.model('User', UserSchema);
exports.model = UserModel;

exports.addUser = function (user, cb) {
    usr = new UserSchema(user);

    usr.save(function (err) {
        if(err) return cb(err, null);
        return cb(err, "User Created");
    })

};

exports.getUser = function (token, cb) {
    UserModel.findOne({ token: token }, function (err, res) {
        if(err) return cb(err, null);
        return cb(err, res);
    })
};