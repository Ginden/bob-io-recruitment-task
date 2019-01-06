'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TruckPositionSchema = new Schema({
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    },
    driverId: {
        type: Number,
        required: true,
    },
});

module.exports.TruckPositionSchema = TruckPositionSchema;
module.exports.TruckPosition = mongoose.model('TruckPosition', TruckPositionSchema);
