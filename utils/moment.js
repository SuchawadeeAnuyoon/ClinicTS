import moment from 'moment'

let format = date => {
    return moment(date).locale('th').format()
}

let format_local = date => {
    return moment(date).locale('th').format('Do MMMM YYYY')
}

let format_local_doc = date => {
    return moment(date).locale('th').format('DD/MM/YYYY')
}

let format_local_time = date => {
    return moment(date).locale('th').format('Do/MM/YY HH:mm:ss')
}

let fotmat_to_calendar = date => {
    return moment(date).locale('th').format('YYYY-MM-DD hh:mm')
}

let format_datepicker = date => {
    return moment(date).local('th').format('YYYY-MM-DD')
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
    return moment(date).local('th').format('YYYY')
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
    getMonthDoc
}