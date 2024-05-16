const helper = {
    getPhoneNumber: (countryCode) => {
        // Generate a random phone number with the specified country code
        return `${countryCode}1234567890`;
    },
    getElementByText: async (text) => {
        return $(`//*[text()="${text}"]`);
    }
};

module.exports = helper;
