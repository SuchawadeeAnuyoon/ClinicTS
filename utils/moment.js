import moment from 'moment'

let format = date => {
    return moment(date).locale('th').format()
}

let format_local = date => {
    return moment(date).locale('th').format('Do MMMM YYYY')
}

let format_local_PS = date => {

    let y = moment(date).year() + 543
    let m = moment(date).locale('th').format('MMMM')
    let d = moment(date).locale('th').format('Do')
    return `${d} ${m} ${y}`
}

let format_local_doc = date => {
    let y = moment(date).year() + 543
    let m = moment(date).locale('th').format('MM')
    let d = moment(date).locale('th').format('DD')
    return `${d}/${m}/${y}`
}

let format_local_time = date => {
    return moment(date).locale('th').format('Do/MM/YY HH:mm:ss')
}

let format_local_full_PS = date => {
    let y = moment(date).year() + 543
    let m = moment(date).locale('th').format('MMMM')
    let d = moment(date).locale('th').format('Do')
    let time  = moment(date).locale('th').format('hh:mm:ss')
    return `${d} ${m} ${y} ${time}`
}

let format_local_time_PS = date => {
    let y = moment(date).year() + 543
    let m = moment(date).locale('th').format('MMM')
    let d = moment(date).locale('th').format('Do')
    let time  = moment(date).locale('th').format('hh:mm:ss')
    return `${d}/${m}/${y} ${time}`
}

let format_calendar_title = date => {
    let m = moment(date, 'MMMM').isValid()
    let y = moment(date).year() + 543
    return `${m} ${y}`
}

let fotmat_to_calendar = date => {
    return moment(date).locale('th').format('YYYY-MM-DD hh:mm')
}

let format_datepicker = date => {
    return moment(date).local('th').format('YYYY-MM-DD')
}

let format_datepicker_appo = date => {

    return moment(date).add(7, 'days').local('th').format('YYYY-MM-DD')
}

let getMonth = date => {
    return moment(date).local('th').format('MM')
}

let getMonthDoc = date => {
    let month = moment(date)
    month.lang('th')
    return month.format('MMMM')
}

let getDate = date => {
    return moment(date).local('th').format('DD')
}

let getYear = date => {
    let y = moment(date).year() + 543
    return `${y}`
}
let getYearUTC = date => {
    let y = moment(date).year()
    return `${y}`
}
export default {
    format,
    format_local,
    format_local_time,
    fotmat_to_calendar,
    format_datepicker,
    getMonth,
    getYear,
    format_local_doc,
    getDate,
    getMonthDoc,
    format_local_PS,
    format_local_time_PS,
    format_local_full_PS,
    format_calendar_title,
    format_datepicker_appo,
    getYearUTC
}