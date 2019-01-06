'use strict';

// An endpoint that receive coordinates and return the closest BoB truck to that coordinates.

module.exports = Truck => async (req, res) => {
    const { body } = req.body;
    const { lat, lng } = body;
    const geoJsonData = {
        type: 'Point',
        coordinates: [lng, lat],
    };
    try {
        const nearestTruck = await Truck.findOne({
            location: {
                $nearSphere: {
                    $geometry: geoJsonData,
                },
            },
        });
        res.status(200).json(nearestTruck);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};
