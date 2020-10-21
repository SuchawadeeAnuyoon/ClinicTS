import moment from 'moment'

let format = date => {
    return moment(date).locale('th').format()
}

let format_local = date => {
    return moment(date).locale('th').format('Do MMMM YYYY')
}

let format_local_time = date => {
    return moment(date).locale('th').format('Do/MM/YY HH:mm:ss')
}

let fotmat_to_calendar = date => {
    return moment(date).locale('th').format('YYYY-MM-DD hh:mm')
}

export default {
    format,
    format_local,
    format_local_time,
    fotmat_to_calendar
}