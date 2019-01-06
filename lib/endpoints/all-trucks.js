'use strict';

// An endpoint that return all the BoB trucks connected at that moment.

module.exports = Truck => async (req, res) => {
    try {
        const trucks = await Truck
            .find({ isConnected: true })
            .exec();
        res.json(trucks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
