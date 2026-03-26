// @ts-check
const { test, expect } = require('@playwright/test');
const bookingDetails = require('../test-data/booking-details.json');
//testcase 2
test('should be able to create a booking', async ({ request }) => {
    const response = await request.post(`/booking`, {
        data: bookingDetails
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    expect(responseBody.booking).toHaveProperty("firstname", "Bale");
    expect(responseBody.booking).toHaveProperty("lastname", "Christian");
    expect(responseBody.booking).toHaveProperty("totalprice", 345);
    expect(responseBody.booking).toHaveProperty("depositpaid", true);
});