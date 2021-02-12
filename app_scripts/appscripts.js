function logNamesAndMajors() {
    var spreadsheetId = '1HoB9dGKgMoKDvz1EGtQ4uSlruK1mWQ5HLIIC6ULE4nE';
    var rangeName = 'Final Template!G5';
    var values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
    startOfMonth = moment(values[0][0]);
    days = generate_month_dates(startOfMonth);
    Logger.log(days)
    /*
    if (start_of_month.isSame(moment("2021-01-01"))) {
        Logger.log('True');
    };
    if (!values) {
        Logger.log('No data found.');
    } else {
        Logger.log('Name, Major:');
        for (var row = 0; row < values.length; row++) {
            Logger.log(' - %s, %s', values[row][0], values[row][4]);
        }
    }
    */
}

function generate_month_dates(startOfMonth) {
    endOfMonth = startOfMonth.clone().add(1, "month").subtract(1, "day");
    var day = startOfMonth;
    days = [];
    while (day <= endOfMonth) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
    }
    return days
}
