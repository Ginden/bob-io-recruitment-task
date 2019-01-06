'use strict';

const { assert } = require('chai');
const sinon = require('sinon');


const { allTrucks: allTrucksFactory } = require('../../lib/endpoints');

describe('Endpoints', () => {
    describe('allTrucks', () => {
        it('Returns right results to user', async () => {
            const fakeResult = [{ foo: 'bar' }];
            const mockedTruck = {
                find: sinon.stub().returns({ exec: () => Promise.resolve(fakeResult) }),
            };

            const endpoint = allTrucksFactory(mockedTruck);

            const mockedRes = {
                json: sinon.stub(),
            };


            await endpoint(null, mockedRes);

            assert(mockedRes.json.calledWith(fakeResult), 'Expected res.json to be called with fakeResult');
        });
    });
});
