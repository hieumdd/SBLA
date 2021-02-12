var moment = require("moment");

function generateDates(startOfMonth) {
    endOfMonth = startOfMonth.clone().add(1, "month").subtract(1, "day");
    var day = startOfMonth;
    days = new Array;
    while (day < endOfMonth) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
    }
    return days
}

a = generateDates(moment("2021-01-01"));
var mainArray = [];
var subArray = [];
for (i = 0; i < a.length; i++) {
    if (moment(a[i]).day() != 0) {
    subArray.push(a[i])
    } else {
        mainArray.push(subArray)
        subArray = []
    }
}

console.log(mainArray)
