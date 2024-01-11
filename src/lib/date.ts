import { format, isToday, isYesterday, differenceInDays, addYears } from 'date-fns'

// const getSpanishDay = function(day: string) {
//     switch(day) {
//         case 'Monday': return 'Lunes'
//         case 'Tuesday': return 'Martes'
//         case 'Wednesday': return 'Miercoles'
//         case 'Thursday': return 'Jueves'
//         case 'Friday': return 'Viernes'
//         case 'Saturday': return 'Sábado'
//         case 'Sunday': return 'Domingo'
//     }

//     return ''
// }

export const getDays = function () {
    return [
        { value: '1', label: 'Lunes' },
        { value: '2', label: 'Martes' },
        { value: '3', label: 'Miércoles' },
        { value: '4', label: 'Jueves' },
        { value: '5', label: 'Viernes' },
        { value: '6', label: 'Sábado' },
        { value: '0', label: 'Domingo' },
    ]
}

export const getMonths = function () {
    return [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ]
}

export const getMonthName = function (month: number) {
    switch (month) {
        case 1: return 'Enero'
        case 2: return 'Febrero'
        case 3: return 'Marzo'
        case 4: return 'Abril'
        case 5: return 'Mayo'
        case 6: return 'Junio'
        case 7: return 'Julio'
        case 8: return 'Agosto'
        case 9: return 'Septiembre'
        case 10: return 'Octubre'
        case 11: return 'Noviembre'
        case 12: return 'Diciembre'
    }

    return 'undefined'
}

export const getFormattedDate = function (date: Date) {
    let dd = date.getDate().toString()
    let mm = (date.getMonth() + 1).toString()

    if (parseInt(dd) < 10) {
        dd = '0' + dd
    }
    if (parseInt(mm) < 10) {
        mm = '0' + mm
    }

    return `${dd}/${mm}/${date.getFullYear()}`
}

export const getFormattedHour = function (date: Date) {
    let hours = date.getHours().toString()
    let minutes = date.getMinutes().toString()
    let seconds = date.getSeconds().toString()

    if (parseInt(hours) < 10) {
        hours = '0' + hours
    }
    if (parseInt(minutes) < 10) {
        minutes = '0' + minutes
    }
    if (parseInt(seconds) < 10) {
        seconds = '0' + seconds
    }

    return `${hours}:${minutes}`
}

export const isEqualDate = function(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
}

export const isMoreThanAWeek = function(date1: Date, date2: Date): boolean {
    return Math.abs(differenceInDays(date1, date2)) > 6
}

export const getHourAndDateMessage = function(date: string) {
    const lastMessageDate = new Date(date)

    let dateText = ` - ${format(lastMessageDate, 'dd/MM/yyyy')}`

    if (isToday(lastMessageDate)) {
        dateText = ''
    }

    if (isYesterday(lastMessageDate)) {
        dateText = '- Ayer'
    }

    const hourAndDateText = `${format(lastMessageDate, 'HH:mm')}${dateText}`

    return hourAndDateText
}

export const getRegisterMinDate = function() {
    const minDate = addYears(new Date(), -18)
    return {
        date: minDate,
        formatedDate: format(minDate, 'dd/MM/yyyy')
    }
}