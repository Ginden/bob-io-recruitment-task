'use strict';

const { DRIVER_STATUS_REQUEST } = require('../constants');

// An endpoint that send a status event to all the active BoB trucks
// and save all the responses in a MongoDB database.

module.exports = io => (req, res) => {
    io.emit(DRIVER_STATUS_REQUEST);
    res.json({
        msg: `Emitted ${DRIVER_STATUS_REQUEST} to all clients`,
    });
};
