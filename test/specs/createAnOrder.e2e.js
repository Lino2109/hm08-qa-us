const page = require('../page');
const helper = require('../helper');

describe('Create an order', () => {
    beforeEach(async () => {
        await browser.url('/');
    });

    it('should set the address', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const pickupInput = await $('//input[@name="pickup"]');
        const dropoffInput = await $('//input[@name="dropoff"]');
        await expect(pickupInput).toHaveValue('East 2nd Street, 601');
        await expect(dropoffInput).toHaveValue('1300 1st St');
    });

    it('should open phone number modal', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButtonXPath);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModalXPath);
        await expect(phoneNumberModal).toBeExisting();
    });

    it('should save the phone', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
    });

    it('should select Supportive plan', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectPlan('Supportive');
        const selectedPlan = await $(`//button[text()="Supportive"][@class="selected"]`);
        await expect(selectedPlan).toBeExisting();
    });

    it('should add a credit card', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.openCreditCardModal();
        await page.fillCreditCardDetails('1234567890123456', '12/25', '123');
        await page.clickAway();
        const linkedCard = await $('//div[contains(text(), "Card ending in 3456")]');
        await expect(linkedCard).toBeExisting();
    });

    it('should write a message for the driver', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const message = "Please arrive 10 minutes early.";
        await page.writeMessageForDriver(message);
        const messageInput = await $('//textarea[@id="driverMessage"]');
        await expect(messageInput).toHaveValue(message);
    });

    it('should order a Blanket and handkerchiefs', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.orderBlanketAndHandkerchiefs();
        const orderStatus = await $('//div[contains(text(), "Blanket and handkerchiefs ordered")]');
        await expect(orderStatus).toBeExisting();
    });

    it('should order 2 Ice creams', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.orderIceCreams(2);
        const orderStatus = await $('//div[contains(text(), "2 Ice creams ordered")]');
        await expect(orderStatus).toBeExisting();
    });

    it('should display car search modal', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.waitForCarSearchModal();
        const carSearchModal = await $('//div[@id="carSearchModal"]');
        await expect(carSearchModal).toBeExisting();
    });

    // Optional: Wait for driver info to appear in the modal
    it('should display driver info in car search modal', async () => {
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.waitForCarSearchModal();
        const driverInfo = await $('//div[@id="driverInfo"]');
        await driverInfo.waitForDisplayed();
        await expect(driverInfo).toBeExisting();
    });
});

