'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const TruckSchema = new Schema({
    isActive: {
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
});
module.exports.TruckSchema = TruckSchema;
module.exports.Truck = mongoose.model('Truck', TruckSchema);
