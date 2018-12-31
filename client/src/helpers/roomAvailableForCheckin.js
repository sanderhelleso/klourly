import { DAYS } from './days';
import { getWeek } from './getWeek';

// globals
const date = new Date();
const today = DAYS[date.getDay() - 1];
const dateISO = date.toISOString().replace('-', '/').split('T')[0].replace('-', '/');


// check if a rooms given times are currently available for checkin
export const roomAvailableForCheckin = times => {

    // check if room is available 
    let valid = false;
    Object.values(times).forEach(time => {
        if (typeof time === 'object' && time !== null) {
            if (validateDays(time.days)) {
                valid = validateTime(time.time);
            }
        }
    });

    return valid;
}


// validate times day and check if today is active
function validateDays(days) {    
    if (days.hasOwnProperty(today)) {
        return true;
    }

    return false;
}

// validate times specific hour and min times
function validateTime(time) {

    // get current timestamp
    const now = date.getTime();

    // get timestamps for from - to time
    const fromTime = new Date(`${dateISO} ${getTwentyFourHourTime(time.from)}:00`).getTime();
    const toTime =   new Date(`${dateISO} ${getTwentyFourHourTime(time.to)}:00`).getTime();

    // check if currently within range of available time
    if (now >= fromTime && now <= toTime) {

        // if true, send back object with to time used for countdown
        return toTime;
    }

    return false;
}

// convert AM - PM to 24 hour time format
function getTwentyFourHourTime(amPm) { 
    const date = new Date(`${dateISO} ${amPm}`); 
    return `${date.getHours()}:${date.getMinutes()}`; 
}