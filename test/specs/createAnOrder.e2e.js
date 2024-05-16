createAnOrder.e2e.js.AI

const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {
    beforeEach(async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    });

    it('should open phone number modal', async () => {
        const phoneNumberButton = await $(page.phoneNumberButtonXPath);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModalXPath);
        await expect(phoneNumberModal).toBeExisting();
    });

    it('should save the phone', async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it('should select Supportive plan', async () => {
        await page.selectPlan('Supportive');
        // Add assertion here if needed
    });

    it('should add a credit card', async () => {
        await page.openCreditCardModal();
        await page.fillCreditCardDetails('1234567890123456', '12/25', '123');
        // Simulate user clicking somewhere else to make link button active
        await page.clickAway();
        // Add assertion here if needed
    });

    it('should write a message for the driver', async () => {
        const message = "Please arrive 10 minutes early.";
        await page.writeMessageForDriver(message);
        // Add assertion here if needed
    });

    it('should order a Blanket and handkerchiefs', async () => {
        await page.orderBlanketAndHandkerchiefs();
        // Add assertions here if needed
    });

    it('should order 2 Ice creams', async () => {
        await page.orderIceCreams(2);
        // Add assertions here if needed
    });

    it('should display car search modal', async () => {
        await page.waitForCarSearchModal();
        // Add assertions here if needed
    });

    // Optional: Wait for driver info to appear in the modal
    it('should display driver info in car search modal', async () => {
        // Add code to wait for driver info in the car search modal
        // Add assertions here if needed
    });
});
