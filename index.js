
  function createEmployeeRecord(employee) {
    const obj = {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return obj
  }

  function createEmployeeRecords(employeeData) {
    const employeeRecords = []
    employeeData.forEach(employee => {
      const record = createEmployeeRecord(employee)
      employeeRecords.push(record)
    })
    return employeeRecords
  }

  function createTimeInEvent(dateStamp) {
    const timeIn = {
      type: "TimeIn",
      hour: parseInt(dateStamp.slice(11,13) + "00"),
      date: dateStamp.slice(0,10)
    }
    this.timeInEvents.push(timeIn)
    return this
  }

  function createTimeOutEvent(dateStamp) {
    const timeOut = {
      type: "TimeOut",
      hour: parseInt(dateStamp.slice(11,13) + "00"),
      date: dateStamp.slice(0,10)
    }
    this.timeOutEvents.push(timeOut)

    return this
  }

  function hoursWorkedOnDate (date) {
    console.log(arguments)
    const startTimeInEvent = this.timeInEvents.find(timeInEvent => timeInEvent.date === date);
    const endTimeOutEvent = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date);
    const startTime = startTimeInEvent.hour
    const endTime = endTimeOutEvent.hour

    return (Math.abs(startTime - endTime) / 100)
  }

  function wagesEarnedOnDate (date) {
    const payPerHour = this.payPerHour

    return payPerHour * hoursWorkedOnDate.call(this, date)
  }

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)
    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(obj => obj.firstName.toLowerCase() === firstName.toLowerCase())
}
