'use strict';

const { assert } = require('chai');

const utils = require('../lib/utils');

const { makeGeoJson } = utils;

describe('Utils', () => {
    describe('makeGeoJson', () => {
        const actual = makeGeoJson(2, 5);
        const expected = { type: 'Point', coordinates: [5, 2] };
        assert.deepEqual(actual, expected);
    });
});
