const executeCheckingRoles = require('../utils/roles')
const { getAttendanceFrom, sendErrorToAuthor } = require('../utils/discord');
const { updateRows, getSpreadSheet, getAttendanceSheetWithNewHeaderDate } = require('../utils/spreadsheets');
const { getDateHeader, getDateToFilter } = require('../utils/dates');

const takeAttendance = (msg, allowedRoles) => executeCheckingRoles(msg, allowedRoles, async () => {
        try {
            const dateToFilter = getDateToFilter(msg.content);
            
            if(!dateToFilter.getTime()) return sendErrorToAuthor(
                msg.author, 
                msg.content, 
                'La fecha no es válida. Intentá definirla mediante notación "DD/MM" (El año ya está predefinido)'
                );

            const presentPeople = await getAttendanceFrom(msg.channel, dateToFilter);

            const doc = await getSpreadSheet();
    
            const dateHeader = getDateHeader(dateToFilter);
            const sheet = await getAttendanceSheetWithNewHeaderDate(doc, dateHeader);
            
            const dataOnSheet = await sheet.getRows();

            await updateRows(dataOnSheet, presentPeople, dateHeader)
        } catch (error) {
            console.log(error)
        }
    })

module.exports = takeAttendance
