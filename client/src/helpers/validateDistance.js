
import geolib from 'geolib';

// validate the difference in location between user and checkin location
const validateDistance = (checkinOptions, userLocation) => {

    // check if radius is required, if not proceed to render checkin button
    if (!checkinOptions.radius) return true;

    // if we cant fetch users location when radius is required
    if (!userLocation.gotLocation) return false;

    // validate if two lat,lng positions is within given radius
    console.log('validation pos...');
    return geolib.isPointInCircle({ 
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude 
        }, {
            latitude: checkinOptions.coords.latitude, 
            longitude: checkinOptions.coords.longitude
        }, checkinOptions.radius
    );
}

export default validateDistance;