import { DAYS } from './days';


// check if a rooms given times are currently available for checkin
export const roomAvailableForCheckin = times => {
    console.log(times);

    // check if room is available today
    Object.entries(times).forEach(
        ([key, value]) => console.log(key, value)
    );

}