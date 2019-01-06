'use strict';

const mongoose = require('mongoose');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Promise = require('bluebird');
const bodyParser = require('body-parser');

const {port, mongoUrl} = require('./config');

const {
    DRIVER_STATUS_RESPONSE,
    DRIVER_GEOLOCATION,
} = require('./constants');

const {
    allTrucks,
    updateTrucks,
    closestTruck,
} = require('./endpoints');

mongoose.Promise = Promise;

function connectWithRetry() {
    return mongoose.connect(mongoUrl, (err) => {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
}

connectWithRetry();


process.on('unhandledRejection', err => {
    setImmediate(() => {
        throw err;
    });
});


const { Truck } = require('./models');
const { geolocate, responseStatus, disconnect } = require('./truck-events');


app.use(bodyParser.json());

app.get('/all', allTrucks(Truck));
app.post('/closest', closestTruck(Truck));
app.get('/update', updateTrucks(io, Truck));


console.log(`http://localhost:${port}/all`);
console.log(`http://localhost:${port}/update`);
console.log(`http://localhost:${port}/closest`);


server.listen(port);


io.on('connection', (socket) => {
    socket.on(DRIVER_GEOLOCATION, geolocate(Truck));
    socket.on(DRIVER_STATUS_RESPONSE, responseStatus(Truck));
    socket.on('PING', (data) => {
        const driverId = data.payload;
        console.log('Received PING data', driverId);
        socket.emit('PONG', { driverId });
        const query = {
            driverId,
        };
        const newData = {
            driverId,
            isConnected: true,
            updatedAt: new Date(),
            location: null
        };
        Truck
            .findOneAndUpdate(query, newData, { upsert: true })
            .exec();
        socket.on('disconnect', disconnect(Truck, driverId));
    });
});
