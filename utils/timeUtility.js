//convert the date to normal date format
// find the minutes difference between now and or between 2 dates 
// get days

//.getMonth() --> january starts from 0 (so to get current month must plus 1)

// convert the timestamp to date
function convertToDate(timestamp) { // timestamp is the string from firebase
    let newDate = new Date(parseInt(timestamp));
    let today = new Date();
    // let todayDec = new Date("12-09-2019");
    // console.log(today.getUTCDate() + " space " + todayDec.getMonth() + " " + todayDec.getUTCMonth);
    // console.log(newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear());
    return newDate;
}

//get the timestamp difference with the current time in minutes
function diff_minutes(timestamp) { // timestamp is the string from firebase
    let date = new Date(parseInt(timestamp));
    let today = new Date(); // current time
    let diff = (today.getTime() - date.getTime()) / 1000 / 60; //1000: milli to seconds, 60 seconds to minutes
    //console.log(Math.abs(Math.round(diff)));
    return Math.abs(Math.round(diff));
}

//check if the timestamp is today, regardless of the time 
function isToday(timestamp) { // timestamp is the string from firebase
    let date = new Date(parseInt(timestamp));
    //newDate = new Date(2019, 04,21);
    const today = new Date();
    return date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear();
}

//check if the timestamp is within the past week (7days)
function aWeekAgo(timestamp) { // timestamp is the string from firebase
    let date = new Date(parseInt(timestamp));
    let weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const today = new Date();
    return date >= weekStart && date <= today;
}

//check if the timestamp is within the past month (30days)
function aMonthAgo(timestamp) { // timestamp is the string from firebase
    let date = new Date(parseInt(timestamp));
    let weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 30);
    const today = new Date();
    return date >= weekStart && date <= today;
}

function getUtcTime() {
    return new Date().getTime();
}


function getCurrentTime() {
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

// app.get("/convertDate", function (req, res) {
//     let timestamp = req.query.timestamp; // string format
//     let newDate = new Date(parseInt(timestamp));
//     let today = new Date();
//     console.log(timestamp);
//     res.end(newDate + "");
// });

// app.get("/dateToday", function (req, res) {
//     let timestamp = req.query.timestamp; // string format
//     let todayCheck = convertDateModule.isToday(timestamp);
//     res.end(todayCheckmus + "");
// });

// app.get("/getDiffMinutes", function (req, res) {
//     let timestamp = req.query.timestamp; // string format
//     let min_diff = convertDateModule.diff_minutes(timestamp);
//     res.end(min_diff + "");
// });

// app.get("/checkAWeekAgo", function (req, res) {
//     let timestamp = req.query.timestamp; // string format
//     let aWeekAgo = convertDateModule.aWeekAgo(timestamp);
//     res.end(aWeekAgo + "");
// });


function getHourMinuteSecond(date) {
    // date input param is a date type
    // return time in format: hh:MM:ss
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

exports.convertToDate = convertToDate;
exports.isToday = isToday;
exports.diff_minutes = diff_minutes;
exports.aWeekAgo = aWeekAgo;
exports.aMonthAgo = aMonthAgo;
exports.getUtcTime = getUtcTime;
exports.getHourMinuteSecond = getHourMinuteSecond;
exports.getCurrentTime =getCurrentTime;