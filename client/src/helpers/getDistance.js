

// Haversine formula - Calculate distance between two points
// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates-shows-wrong

const getDistance = (lat1, lon1, lat2, lon2) => {

	const R = 6371; // Radius of earth in km
	
    const dLat = deg2rad(lat2 - lat1);  
	const dLon = deg2rad(lon2 - lon1); 
	
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      	      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		      Math.sin(dLon/2) * Math.sin(dLon/2); 

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 

     // Distance in km
    return Math.ceil(R * c);
}

// convert degrees to radius
const deg2rad = deg => deg * (Math.PI / 180);

export default getDistance;