const executeCheckingRoles = require('../utils/executeCheckingRoles')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../cafe-server-1546112135269-ecca3ef2e946.json')
const getPresentsFrom = require('../utils/getPresentsFrom')

const takeAttendance = async (msg, allowedRoles) => {
    try {
        const presentPeople = await getPresentsFrom(msg.channel)

        const doc = new GoogleSpreadsheet('1rtHUbEfEs6np-57ONBQ7gdsjjR3HoGCjYJgOrezUsK4');
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.loadHeaderRow()
        console.log(sheet.headerValues)
        sheet.setHeaderRow([...sheet.headerValues, "hahaA"])
        const dataOnSheet = await sheet.getRows();
        dataOnSheet.forEach(async row => {
            row.test = "haha this works"
            await row.save()
        })
        console.log(dataOnSheet.map(row => row.username));
    } catch (error) {
        console.log(error)
    }
}

module.exports = takeAttendance