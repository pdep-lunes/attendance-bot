const executeCheckingRoles = require('../utils/executeCheckingRoles')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const getPresentsFrom = require('../utils/getPresentsFrom')

const getSpreadSheet = async () => {
    const doc = new GoogleSpreadsheet('1rtHUbEfEs6np-57ONBQ7gdsjjR3HoGCjYJgOrezUsK4'); // Spreadsheet link ID
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    });
    await doc.loadInfo();
    return doc;
}

const getAttendanceSheetWithNewHeaderDate = async (document, dateHeader) => {
    const sheet = Object.values(document.sheetsById).find(sheet => sheet.title == "Asistencia");
    await sheet.loadHeaderRow();
    
    try {
        await sheet.setHeaderRow([...sheet.headerValues, dateHeader]);
    } catch(error) {
        console.log("header date is already defined");
    }

    return sheet;
}

const takeAttendance = async (msg, allowedRoles) => {
    executeCheckingRoles(msg, allowedRoles, async () => {
        try {
            const presentPeople = await getPresentsFrom(msg.channel);
            const doc = await getSpreadSheet();
    
            const day = new Date();
            const dateHeader =  `${day.getDate().toString()}/${(day.getMonth() + 1).toString()}`;
            const sheet = await getAttendanceSheetWithNewHeaderDate(doc, dateHeader);
    
            const dataOnSheet = await sheet.getRows();
            
            const usersOnSheet = dataOnSheet.map(row => row.username);
    
            presentPeople.forEach(async presentPerson => {
                const rowToUpdate = dataOnSheet.find(row => row.username == presentPerson);
                if(rowToUpdate) {
                    rowToUpdate[dateHeader] = "P";
                    await rowToUpdate.save()
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports = takeAttendance