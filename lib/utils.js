'use strict';

function properMakeGeoJson(lat, lng) {
    return {
        type: 'Point',
        coordinates: [lng, lat],
    };
}

module.exports.makeGeoJson = (...args) => {
    if (args.length === 2) {
        return properMakeGeoJson(...args);
    }
    const {lat, lng} = args[0];
    return properMakeGeoJson(lat, lng);

};
