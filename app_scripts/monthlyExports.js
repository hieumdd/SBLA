function main() {
    var spreadsheetId = '1HoB9dGKgMoKDvz1EGtQ4uSlruK1mWQ5HLIIC6ULE4nE';
    const ss = SpreadsheetApp.openById(spreadsheetId)

    const calculatorSheet = ss.getSheetByName('Final Template')
    const exportsSheet = ss.getSheetByName('Sheet1')

    const budgetRange = "D5";
    const weeklyRange = "D22:H22"
    const startOfMonthRange = "G5"

    var budget = calculatorSheet.getRange(budgetRange).getValue()
    var startOfMonth = moment(calculatorSheet.getRange(startOfMonthRange).getValue())
    var weeklyAllocation = calculatorSheet.getRange(weeklyRange).getValues()[0]
    var weeklyArray = weeklyAllocation.join(",")

    exportsSheet.insertRowBefore(2)
    var targetRange = exportsSheet.getRange("A2:C2")
    targetRange.setValues([[startOfMonth.format("YYYY-MM-DD"), weeklyArray, budget]])
}
