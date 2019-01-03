import { DAYS } from './days';
import { getWeek } from './getWeek';

// globals
const date = new Date();
const day = DAYS[date.getDay() - 1];
const dateISO = date.toISOString()
                .replace('-', '/')
                .split('T')[0]
                .replace('-', '/');


// check if a rooms given times are currently available for checkin
export const roomAvailableForCheckin =  times => {

    // check if room is available
    let firstFound = false;
    let data = false;
    Object.entries(times).every(([key, value]) => {

        // check if type is a valid object (ignore singel key - value pairs)
        if (typeof value === 'object' && value !== null) {

            // validate if today is part of rooms times
            if (validateDays(value.days)) {

                // validate day specific times and check if available
                const availableTo = validateTime(value.time);

                // get first matching found incase of overlapping times
                if (availableTo && !firstFound) {

                    // set value
                    data = { key, day, availableTo };
                    firstFound = true; // set found
                }
            }
        }
    });

    return data;
}


// validate times day and check if today is active
function validateDays(days) {   
    if (days.hasOwnProperty(day)) {
        return true;
    }

    return false;
}

// validate times specific hour and min times
function validateTime(time) {

    // get current timestamp
    const now = date.getTime();
    const dayInMs = 86400000;

    // get timestamps for from - to time
    const fromTime = new Date(`${dateISO} ${getTwentyFourHourTime(time.from)}:00`).getTime() - dayInMs;
    const toTime =   new Date(`${dateISO} ${getTwentyFourHourTime(time.to)}:00`).getTime() - dayInMs;

    /**
     * NOTE: for some reasom from and to days are 1 day ahead, need to read more about the API
     *       could potensially cause bugs for people in different timezones?
     */

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