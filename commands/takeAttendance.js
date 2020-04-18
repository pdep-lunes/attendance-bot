const executeCheckingRoles = require('../utils/executeCheckingRoles')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const takeAttendance = async (msg, allowedRoles) => {
    try {
        
        const doc = new GoogleSpreadsheet('12LnVK3x71EpABUFuH8pSd0SLJO2OdBWmBaIU98rbyg8');
        console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY
          });
        console.log("hehe")
        await doc.loadInfo();
        console.log(doc.title);
    } catch (error) {
        console.log(error)
    }
}

module.exports = takeAttendance