const executeCheckingRoles = require('../utils/roles')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const getAttendanceFrom = require('../utils/discord');
const { updateRows } = require('../utils/spreadsheets');

const takeAttendance = (msg, allowedRoles) => executeCheckingRoles(msg, allowedRoles, async () => {
        try {
            const dateToFilter = new Date(msg.content.split(' ')[1]);
            const presentPeople = await getAttendanceFrom(msg.channel, dateToFilter);
            console.log(presentPeople)
            /*
            const doc = await getSpreadSheet();
    
            const day = new Date();
            const dateHeader = `${day.getDate().toString()}/${(day.getMonth() + 1).toString()}`;
            const sheet = await getAttendanceSheetWithNewHeaderDate(doc, dateHeader);
    
            const dataOnSheet = await sheet.getRows();
    
            await updateRows(sheet, presentPeople, dataOnSheet)*/
        } catch (error) {
            console.log(error)
        }
    })

module.exports = takeAttendance
