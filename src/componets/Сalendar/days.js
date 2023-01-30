import { eachDayOfInterval, endOfWeek, endOfMonth,lastDayOfMonth, format, startOfMonth, startOfToday } from "date-fns";

let today = startOfToday()
let firstDay=startOfMonth(today)
let lastDay=lastDayOfMonth(today)
let days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfWeek(endOfMonth(today)),
})
console.log(days)
const calendar = {
    today: format(today, 'MMM yyyy'),
    days: days,
    start:firstDay,
    last:lastDay,
}

export default calendar;