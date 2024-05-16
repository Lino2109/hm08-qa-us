const page = {
    fillAddresses: async (pickup, dropoff) => {
        const pickupInput = await $('//input[@name="pickup"]');
        await pickupInput.setValue(pickup);
        const dropoffInput = await $('//input[@name="dropoff"]');
        await dropoffInput.setValue(dropoff);
    },
    phoneNumberButtonXPath: '//button[@id="phoneNumberButton"]',
    phoneNumberModalXPath: '//div[@id="phoneNumberModal"]',
    submitPhoneNumber: async (phoneNumber) => {
        const phoneInput = await $('//input[@name="phone"]');
        await phoneInput.setValue(phoneNumber);
        const submitButton = await $('//button[@id="submitPhoneNumber"]');
        await submitButton.click();
    },
    selectPlan: async (plan) => {
        const planButton = await $(`//button[text()="${plan}"]`);
        await planButton.click();
    },
    openCreditCardModal: async () => {
        const addCardButton = await $('//button[@id="addCreditCard"]');
        await addCardButton.click();
    },
    fillCreditCardDetails: async (number, expiry, cvv) => {
        const numberInput = await $('//input[@id="cardNumber"]');
        await numberInput.setValue(number);
        const expiryInput = await $('//input[@id="expiryDate"]');
        await expiryInput.setValue(expiry);
        const cvvInput = await $('//input[@id="code"]');
        await cvvInput.setValue(cvv);
        await cvvInput.keys('Tab'); // Simulate TAB key press
    },
    clickAway: async () => {
        const body = await $('//body');
        await body.click();
    },
    writeMessageForDriver: async (message) => {
        const messageInput = await $('//textarea[@id="driverMessage"]');
        await messageInput.setValue(message);
    },
    orderBlanketAndHandkerchiefs: async () => {
        const orderButton = await $('//button[@id="orderBlanket"]');
        await orderButton.click();
    },
    orderIceCreams: async (quantity) => {
        const iceCreamInput = await $('//input[@id="iceCreamQuantity"]');
        await iceCreamInput.setValue(quantity);
        const orderButton = await $('//button[@id="orderIceCream"]');
        await orderButton.click();
    },
    waitForCarSearchModal: async () => {
        const carSearchModal = await $('//div[@id="carSearchModal"]');
        await carSearchModal.waitForDisplayed();
    }
};

module.exports = page;
;
