const { GoogleSpreadsheet } = require('google-spreadsheet')

const getSpreadSheet = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_LINK_ID);
  await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  });
  await doc.loadInfo();
  return doc;
}

const getAttendanceSheetWithNewHeaderDate = async (document, dateHeader) => {
  const sheet = Object.values(document.sheetsById).find(sheet => sheet.title === "Asistencia");

  await sheet.loadHeaderRow();
  await sheet.loadCells();
  try {
    await sheet.setHeaderRow([...sheet.headerValues, dateHeader]);
  } catch(error) {
    console.log("header date is already defined");
  }
  
  return sheet;
}

const getColumnIndex = (sheet, dateHeader) => sheet.headerValues.findIndex(header => header === dateHeader);

const updateRows = (dataOnSheet, presentPeople, sheet, columnDayIndex) => {
  presentPeople.forEach(presentPerson => {
  const rowToUpdate = dataOnSheet.find(row => row.username === presentPerson);

  if(rowToUpdate) {
    const cellToUpdate = sheet.getCell(rowToUpdate.rowNumber - 1, columnDayIndex);
    cellToUpdate.value = 'P';
  } else {
    console.log(`${presentPerson} no fue encontrado.`)
  }
  })

  return sheet.saveUpdatedCells();
}

module.exports = {
  getSpreadSheet,
  getAttendanceSheetWithNewHeaderDate,
  updateRows,
  getColumnIndex
}
