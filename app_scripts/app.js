function getDaysInMonth(month, year) {
    month = month - 1;
    var date = new Date(year, month, 1, 7);
    console.log(date);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff))
};

var all_days = getDaysInMonth(1, 2021);

var start_of_weeks = []
for (i = 0; i < all_days.length; i++) {
    var start_of_week = getMonday(all_days[i]);
    start_of_weeks.push(start_of_week);
}
var start_of = []

start_of = start_of_weeks.filter((date, i, self) => 
  self.findIndex(d => d.getTime() === date.getTime()) === i
)
for (i = 0; i < start_of.length; i++) {
    console.log(start_of[i].toISOString().substring(0, 10))
}
console.log(start_of)
