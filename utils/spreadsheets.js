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
  
  try {
      await sheet.setHeaderRow([...sheet.headerValues, dateHeader]);
  } catch(error) {
      console.log("header date is already defined");
  }

  return sheet;
}

const updateRows = (sheet, presentPeople) => presentPeople.forEach(async presentPerson => {
  const rowToUpdate = dataOnSheet.find(row => row.username == presentPerson);
  if(rowToUpdate) {
      rowToUpdate[dateHeader] = "P";
      await rowToUpdate.save()
  }
})

module.exports = {
  getSpreadSheet,
  getAttendanceSheetWithNewHeaderDate,
  updateRows
}