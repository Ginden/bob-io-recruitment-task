'use strict';

const mongoose = require('mongoose');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Promise = require('bluebird');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/bob', { useNewUrlParser: true });

const {
    DRIVER_STATUS_RESPONSE,
    DRIVER_STATUS_REQUEST,
    DRIVER_GEOLOCATION,
} = require('./constants');

const {
    allTrucks,
    updateTrucks,
    closestTruck,
} = require('./endpoints');

const killAppWithError = err => setImmediate(() => {
    throw err;
});

const { Truck } = require('./models');
const { geolocate, requestStatus, responseStatus } = require('./truck-events');


server.listen(40718);


app.get('/all', allTrucks());
app.post('/closest', closestTruck());
app.get('/update', updateTrucks(io, Truck));


io.on('connection', (socket) => {
    socket.on(DRIVER_GEOLOCATION, geolocate);
    socket.on(DRIVER_STATUS_REQUEST, requestStatus);
    socket.on(DRIVER_STATUS_RESPONSE, responseStatus);
    socket.on('PING', (data) => {
        const driverId = data.payload;
        console.log('Received PING data', driverId);
        socket.emit('PONG', { driverId });
        const query = {
            driverId,
        };
        const newData = {
            driverId,
            isActive: false,
        };
        Truck
            .findOneAndUpdate(query, newData, { upsert: true })
            .exec()
            .catch(killAppWithError);
        socket.on('disconnect', () => {
            console.log(`Driver ${driverId} disconnected`);
            const notActiveData = {
                driverId,
                isActive: false,
            };
            Truck
                .findOneAndUpdate(query, notActiveData, { upsert: true })
                .exec()
                .catch(killAppWithError);
        });
    });
});
