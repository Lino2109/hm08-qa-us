const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
    })

    it('should select supportive plan', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
      //  await expect(supportivePlanButton).toHaveAttributeContaining('class', 'selected');
    })

     it('should fill phone number and submit', async () => {
         await browser.url('/')
         await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
         const phoneNumberButton = await $(page.phoneNumberButton);
         await phoneNumberButton.waitForDisplayed();
         await phoneNumberButton.click();
         const phoneNumber = helper.getPhoneNumber("+1");
//        await page.submitPhoneNumber(phoneNumber);
     })

     it('should add new card', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillCardDetails("123456789101","14");
     })
     

     it('should enter card details and CVV', async () => {
         await browser.url('/')
         await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
         await page.fillCardDetails("123456789101","14");
     })
    
    
     it('should enter message for driver', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const message = 'Do not ring the doorbell'; // Define the message
        await page.enterMessageForDriver(message);
        const enterMessageForDriver = await $(page.messageField);
        await expect(enterMessageForDriver).toHaveValue(message);
    });
    
   it('should order blanket and handkerchief', async () => {
    await browser.url('/');
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.blanketHandkerchiefSelect();
    await expect($(page.orderBlanketAndHanderchiefstatus)).toBeChecked();
});

     it('should order 2 ice creams', async () => {
         await browser.url('/')
         await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
         await page.iceCreamSelect();
        expect($(page.iceCreamValue)).toHaveValue(2);
 });

     it('should display car search modal', async () => {
         await browser.url('/')
         await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
         const phoneNumber = helper.getPhoneNumber("+1");
         await page.submitPhoneNumber(phoneNumber);
         const message = 'Do not ring the doorbell'; // Define the message
         await page.enterMessageForDriver(message);
         await $(page.orderButton).click();
         const carSearchModal = await $(page.carSearchModal);
         await carSearchModal.waitForDisplayed();
//         expect($(page.carSearchModal)).toBeDisplayed();
     });

})

