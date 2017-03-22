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