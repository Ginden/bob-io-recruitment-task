'use strict';

const { assert } = require('chai');

const utils = require('../lib/utils');

const { makeGeoJson } = utils;

describe('Utils', () => {
    describe('makeGeoJson', () => {
        it('Should create geoJson object from two numbers', () => {
            const actual = makeGeoJson(2, 5);
            const expected = { type: 'Point', coordinates: [5, 2] };
            assert.deepEqual(actual, expected);
        });

        it('Should create geoJson object from standard body of geolocation event', () => {
            const actual = makeGeoJson({ lng: 5, lat: 2 });
            const expected = { type: 'Point', coordinates: [5, 2] };
            assert.deepEqual(actual, expected);
        });
    });
});
