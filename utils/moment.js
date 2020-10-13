import moment from 'moment'

let format = date => {
    return moment(date).format()
}

let format_local = date => {
    return moment(date).locale('th').format('Do MMMM  YYYY')
}

export default {
    format,
    format_local
}