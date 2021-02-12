function doGet(e) {
    a = main();
    return ContentService.createTextOutput(JSON.stringify(a));
}

function main() {
    var spreadsheetId = '1HoB9dGKgMoKDvz1EGtQ4uSlruK1mWQ5HLIIC6ULE4nE';
    const ss = SpreadsheetApp.openById(spreadsheetId)

    const calculatorSheet = ss.getSheetByName('Final Template')
    const exportsSheet = ss.getSheetByName('exports')

    const budgetRange = "D5";
    const weeklyRange = "D22:H22"
    const startOfMonthRange = "G5"

    var budget = calculatorSheet.getRange(budgetRange).getValue()
    var startOfMonth = moment(calculatorSheet.getRange(startOfMonthRange).getValue())
    var weeklyAllocation = calculatorSheet.getRange(weeklyRange).getValues()[0]

    days = generateDates(startOfMonth);
    days = days.map(x => moment(x).format("YYYY-MM-DD"));
    var result = {
        'startOfMonth': moment(startOfMonth).format("YYYY-MM-DD"),
        'startOfWeeks': days
    }
    return result
}

function generateDates(startOfMonth) {
    endOfMonth = startOfMonth.clone().add(1, "month").subtract(1, "day");
    var day = startOfMonth;
    days = new Array;
    while (day < endOfMonth) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
    }
    days = generateStartOfWeeks(days)
    return days
}

function generateStartOfWeeks(daysInMonth) {
    startOfWeeks = [];
    for (i = 0; i < daysInMonth.length; i++) {
        startOfWeek = moment(daysInMonth[i]).startOf('week');
        startOfWeeks.push(startOfWeek);
    }
    startOfWeeks = startOfWeeks.filter((v, i) => {
        return startOfWeeks.findIndex(candidate => v.isSame(candidate)) == i
    });
    return startOfWeeks
}
