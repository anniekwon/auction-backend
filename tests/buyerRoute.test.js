jest.mock('../models/buyerModel');
const Buyer = require('./../models/buyerModel');
const {describe, expect, test} = require('@jest/globals');
const { getBuyerById } = require('./../routes/buyerRoute');

describe('get buyer by id', () => {
    
    test('id is 1', async () => {
        const expectedBuyer = { name: 'You found me'};
        Buyer.find.mockResolvedValue(expectedBuyer);

        expect(await getBuyerById(1)).toBe(expectedBuyer);
    })
})
