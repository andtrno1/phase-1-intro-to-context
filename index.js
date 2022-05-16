// Your code here
function createEmployeeRecord(String, Str, string, Number){
    let employee = {
        firstName : String,
        familyName : Str,
        title: string,
        hours: Number,
        timeInEvents:[],
        timeOutEvents:[]
    }
    return employee
}

function createEmployeeRecords(datas){
    datas.map(data =>{
        return  createEmployeeRecord(data);
    })
}

function createTimeInEvent(record, dateStamps){
    let [date, hour] = dateStamps.split('')
    record.timeInEvents.push({
        type : 'Timein',
        hour : parseInt(hour,10),
        date,
    })
    return record
}

function createTimeOutEvent(record, dateStamps){
    let [date, hour] = dateStamps.split('')

    record.timeOutEvents.push({
        type: 'TimeOut',
        hour : parseInt(hour, 10),
        date
    })
    return record
}

function hoursWorkedOnDate(employeeRecord, date) {
    let clockedOut = 0;
    let clockedIn = 0;
    for (let timeIn of employeeRecord.timeInEvents) {
        if (timeIn.date == date) {
            clockedIn = timeIn.hour;
        }
    }
    for (let timeOut of employeeRecord.timeOutEvents) {
        if (timeOut.date == date) {
            clockedOut = timeOut.hour;
        }
    }
    return (clockedOut - clockedIn) / 100;
}
function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date);
    let wage = employeeRecord.payPerHour;
    return hours * wage;

}
function allWagesFor(employeeRecord) {
    let pays = [];
    for (let timeIn of employeeRecord.timeInEvents) {
        let date = timeIn.date;
        let wageOnDay = wagesEarnedOnDate(employeeRecord, date);
        pays.push(wageOnDay);
    }
    return pays.reduce(function (total, num) { return total + num }, 0);
}
function calculatePayroll(employeeRecords) {
    let wages = [];
    for (let employee of employeeRecords) {
        wages.push(allWagesFor(employee));
    }
    return wages.reduce(function (total, num) { return total + num }, 0);
}


