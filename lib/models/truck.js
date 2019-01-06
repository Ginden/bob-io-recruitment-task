'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;


const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const TruckSchema = new Schema({
    isConnected: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
    },
    driverId: {
        type: Number,
        required: true,
        index: {
            unique: true,
            dropDups: true,
        },
    },
    location: {
        type: pointSchema,
        required: false,
        default: null,
    },
});
module.exports.TruckSchema = TruckSchema;
module.exports.Truck = mongoose.model('Truck', TruckSchema);
