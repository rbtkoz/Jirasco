'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    summary: {
        type: String
    },
    description: {
        type: String
    },
    initiator: {
        type: String
    },
    customer: {
        type: String
    },
    subject: {
        type: String
    },
    products: {
        type: String
    },
    priority: {
        type: String
    }
});


mongoose.model('Reco', schema);
