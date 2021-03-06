import { DAYS } from './days';
import { getWeek } from './getWeek';

// globals
const date = new Date(new Date().toISOString());
const day = DAYS[date.getDay() - 1];
const dateISO = date.toISOString()
                .replace('-', '/')
                .split('T')[0]
                .replace('-', '/');


// check if a rooms given times are currently available for checkin
export const roomAvailableForCheckin = times => {

    // check if room is available
    let firstFound = false;
    let data = {
        available: false,
        nextAvailable: {
            found: false
        }
    };

    Object.entries(times).forEach(([key, value]) => {

        // check if type is a valid object (ignore singel key - value pairs)
        if (typeof value === 'object' && value !== null) {

            // validate if today is part of rooms times
            if (validateDays(value.days)) {

                // validate day specific times and check if available
                const available = validateTime(value.time);

                // get first matching found incase of overlapping times
                if (available.time && !firstFound) {

                    // set value
                    data = { 
                        ...data,
                        key,
                        day,
                        availableTo: available.time,
                        available: true
                    };
                    
                    firstFound = true; // set found
                }

                else {

                    // if no next available is present, set
                    if (!data.nextAvailable.fromTime) {
                        data.nextAvailable = {
                            key,
                            ...available,
                            found: true
                        };
                    }

                    // if present compare and update if needed
                    else {
                        if ((data.nextAvailable.fromTime - date.getTime()) < (available.fromTime - date.getTime())) {
                            data.nextAvailable = {
                                key,
                                ...available,
                                found: true
                            };
                        }
                    }
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
     * NOTE: FIX DAY CHANGE BUG
     */

     /*console.log(now);
     console.log(fromTime);
     console.log(toTime);*/

    // check if currently within range of available time, if not send back next and update
    return (now >= fromTime && now <= toTime) ? { time: toTime } : { fromTime, toTime };
}

// convert AM - PM to 24 hour time format
function getTwentyFourHourTime(amPm) { 
    const date = new Date(`${dateISO} ${amPm}`); 
    return `${date.getHours()}:${date.getMinutes()}`; 
}
