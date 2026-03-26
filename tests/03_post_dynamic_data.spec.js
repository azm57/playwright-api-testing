// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { DateTime } = require("luxon");

const randomFirstName = faker.person.firstName()
const randomLastName = faker.person.lastName()
const randomNumber = faker.number.int({ min: 1000, max: 9999 })
const currentDate = DateTime.now().toFormat('yyyy-MM-dd')
const currentDatePlusFive = DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd')

test('should be able to create a booking', async ({ request }) => {
    const response = await request.post(`/booking`, {
        data: {
            "firstname": randomFirstName,
            "lastname": randomLastName,
            "totalprice": randomNumber,
            "depositpaid": true,
             "bookingdates": {
                 "checkin": currentDate,
                 "checkout": currentDatePlusFive
             },
            "additionalneeds": "Breakfast"
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    expect(responseBody.booking).toHaveProperty("firstname", randomFirstName);
    expect(responseBody.booking).toHaveProperty("lastname", randomLastName);
    console.log(await response.json());
});