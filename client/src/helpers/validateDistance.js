
import geolib from 'geolib';

// allowed potensial margin offset location fetch depening on returen accuracy
const DISTANCE_MARGIN_HIGH_ACCURACY = 10;
const DISTANCE_MARGIN_LOW_ACCURACY = 100;

// validate the difference in location between user and checkin location
const validateDistance = (checkinOptions, userLocation) => {

    // check if radius is required, if not proceed to render checkin button
    if (!checkinOptions.radius) return true;

    // if we cant fetch users location when radius is required
    if (!userLocation.gotLocation) return false;

    // validate if two lat,lng positions is within given radius
    console.log('validation pos...');
    console.log(userLocation);

    const getOffset = userLocation.coords.accuracy <= 50 
                     ? DISTANCE_MARGIN_HIGH_ACCURACY
                     : DISTANCE_MARGIN_LOW_ACCURACY;

    return geolib.isPointInCircle({ 
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude 
        }, {
            latitude: checkinOptions.coords.latitude, 
            longitude: checkinOptions.coords.longitude
        }, checkinOptions.radius + getOffset // checkin radius and offset
    );
}

export default validateDistance;