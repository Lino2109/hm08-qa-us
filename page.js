module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number', // New field
    cardCVVField: '.card-second-row #code',       // New field
    addCardButton: 'div=Add card',
    paymentMethodButton: '.pp-text',
    messageField: '//*[@id="comment"]',       // New field
    message: '//*[@id="comment"]',
    // Buttons
    callATaxiButton: '#root > div > div.workflow > div.workflow-subcontainer > div.type-picker.shown > div.results-container > div.results-text > button',
    phoneNumberButton: '#root > div > div.workflow > div.workflow-subcontainer > div.tariff-picker.shown > div.form > div.np-button',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    orderBlanketAndHandkerchiefButton: '.switch', // Replace with your actual selector
    orderBlanketAndHanderchiefstatus: '.switch-input',
    orderIceCreamButton:'.counter-plus',
    iceCreamValue: '.counter-value',
    orderButton: '.smart-button',
    
    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: 'div=Car search',
    driverInfoModal: 'div=order-button',
    // Supportive Plan
    supportivePlanButton: 'div=Supportive',
    // supportivePlanModal: '.supportive-plan-modal'
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method cal
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
        
    },
    fillCardDetails: async function(cardNumber, cardCVV) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();

        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.setValue(cardNumber);
        const cardCVVField = await $(this.cardCVVField);
        await cardCVVField.setValue(cardCVV);
    },
    enterMessageForDriver: async function(message) {
        const messageField = await $(this.messageField);
        await messageField.setValue(message); // Use the message parameter directly
    },
    blanketHandkerchiefSelect: async function() {
        const orderBlanketAndHandkerchiefButton = await $(this.orderBlanketAndHandkerchiefButton);
        await orderBlanketAndHandkerchiefButton.waitForDisplayed({ timeout: 20000 });
        await orderBlanketAndHandkerchiefButton.click();
        
    },
    iceCreamSelect: async function() {
        const orderIceCreamButton = await $(this.orderIceCreamButton);
        await orderIceCreamButton.click();
        await orderIceCreamButton.click(); // Assuming clicking twice orders two ice creams
    },
    displayCarSearchModal: async function() {
        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForDisplayed({ timeout: 10000 });
    },
    displayDriverInfo: async function() {
        const driverInfoModal = await $(this.driverInfoModal);
        await driverInfoModal.waitForDisplayed({ timeout: 10000 });
    },
};
