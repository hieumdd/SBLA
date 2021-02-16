function main() {
    const spreadsheetId = '1Yc_HfwprqH_pCZkzrZb5yxgzgoVqMcq5XOJ0eCbBA8M';
    const ss = SpreadsheetApp.openById(spreadsheetId);

    const calculatorSheet = ss.getSheetByName('Final Template');
    const exportsSheet = ss.getSheetByName('exports');

    const startOfMonthRange = "H13";
    const monthBudgetRange = "D5";
    const projectedMonthROASRange = "H5";

    const projectedAllocationRange = "K113:K117";
    const projectedSpendRange = "L113:L117";
    const projectedDailySpendRange = "M113:M117";

    const actualAllocationRange = "N113:N117";
    const actualSpendRange = "O113:O117";
    const actualDailySpendRange = "P113:P117";

    const salesLaunchesDurationRange = "D89:D93";
    const salesLaunchesNameRange = "E89:E93"
    const salesLaunchesOfferRange = "F89:F93"
    const salesLaunchesGraphicAssetsRange = "I89:I93"
    const salesLaunchesVideoAssetsRange = "G89:G93"
    const salesLaunchesProjectedSpendRange = "L89:L93"
    
    var now = new Date().toISOString()

    var startOfMonth = calculatorSheet.getRange(startOfMonthRange).getValue();
    var monthBudget = calculatorSheet.getRange(monthBudgetRange).getValue();
    var projectedMonthROAS = calculatorSheet.getRange(projectedMonthROASRange).getValue();

    var projectedAllocation = calculatorSheet.getRange(projectedAllocationRange).getValues();
    var projectedSpend = calculatorSheet.getRange(projectedSpendRange).getValues();
    var projectedDailySpend = calculatorSheet.getRange(projectedDailySpendRange).getValues();

    var actualAllocation = calculatorSheet.getRange(actualAllocationRange).getValues();
    var actualSpend = calculatorSheet.getRange(actualSpendRange).getValues();
    var actualDailySpend = calculatorSheet.getRange(actualDailySpendRange).getValues();

    var salesLaunchesDuration = calculatorSheet.getRange(salesLaunchesDurationRange).getValues();
    var salesLaunchesName = calculatorSheet.getRange(salesLaunchesNameRange).getValues();
    var salesLaunchesOffer = calculatorSheet.getRange(salesLaunchesOfferRange).getValues();
    var salesLaunchesGraphicAssets = calculatorSheet.getRange(salesLaunchesGraphicAssetsRange).getValues();
    var salesLaunchesVideoAssets = calculatorSheet.getRange(salesLaunchesVideoAssetsRange).getValues();
    var salesLaunchesProjectedSpend = calculatorSheet.getRange(salesLaunchesProjectedSpendRange).getValues();

    projectedAllocation = transformToArray(projectedAllocation)
    projectedSpend = transformToArray(projectedSpend)
    projectedDailySpend = transformToArray(projectedDailySpend)
    
    actualAllocation = transformToArray(actualAllocation)
    actualSpend = transformToArray(actualSpend)
    actualDailySpend = transformToArray(actualDailySpend)
    
    salesLaunchesDuration = transformToArray(salesLaunchesDuration)
    salesLaunchesName = transformToArray(salesLaunchesName)
    salesLaunchesOffer = transformToArray(salesLaunchesOffer)
    salesLaunchesGraphicAssets = transformToArray(salesLaunchesGraphicAssets)
    salesLaunchesVideoAssets = transformToArray(salesLaunchesVideoAssets)
    salesLaunchesProjectedSpend = transformToArray(salesLaunchesProjectedSpend)

    var row = []
    for (i = 0; i < 5; i++) {
      row.push(
            [
                startOfMonth,
                i + 1,
                monthBudget,
                projectedMonthROAS,
                projectedAllocation[i],
                projectedSpend[i],
                projectedDailySpend[i],
                actualAllocation[i],
                actualSpend[i],
                actualDailySpend[i],
                salesLaunchesDuration[i],
                salesLaunchesName[i],
                salesLaunchesOffer[i],
                salesLaunchesGraphicAssets[i],
                salesLaunchesVideoAssets[i],
                salesLaunchesProjectedSpend[i],
                now
            ]
        )
    }

    exportsSheet.insertRows(2, 5)
    var targetRange = exportsSheet.getRange("A2:Q6")
    targetRange.setValues(row)
}

function transformToArray(col) {
    var _array = []
    for (const value of col) {
        _array.push(value[0]);
    }
    return _array;
}
