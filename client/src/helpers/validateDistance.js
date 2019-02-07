

// Haversine formula - Calculate distance between two points
// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates-shows-wrong

const getDistance = (lat1, lon1, lat2, lon2) => {

	const R = 6371; // Radius of earth in km
	
    const dLat = deg2rad(lat2 - lat1);  
	const dLon = deg2rad(lon2 - lon1); 
	
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      	      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		      Math.sin(dLon / 2) * Math.sin(dLon / 2); 

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 

     // Distance in km
    return Math.ceil(R * c) * 1000;
}

// convert degrees to radius
const deg2rad = deg => deg * (Math.PI / 180);

// validate the difference in location between user and checkin location
const validateDistance = (checkinOptions, userLocation) => {

    // check if radius is required, if not proceed to render checkin button
    if (!checkinOptions.radius) return true;

    // if we cant fetch users location when radius is required
    if (!userLocation.gotLocation) return false;

    // calculate distance
    const distance = getDistance(
                        userLocation.coords.latitude,
                        userLocation.coords.longitude,
                        checkinOptions.coords.latitude,
                        checkinOptions.coords.longitude,
                    );

    console.log(distance);

    // if within distance, proceed to render checkin button
    if (distance <= checkinOptions.radius) return true;

    return false;
}

export default validateDistance;