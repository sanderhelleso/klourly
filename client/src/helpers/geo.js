import geolib from 'geolib';

export const geo = {
    geopositionToObject,
    isWithinDistance
}

function geopositionToObject(geoposition) {
    return {
        timestamp: geoposition.timestamp,
        coords: {
            accuracy: geoposition.coords.accuracy,
            latitude: geoposition.coords.latitude,
            longitude: geoposition.coords.longitude
        }
    }
};


function isWithinDistance(currentPos, targetPos, radius) {

    const distance = geolib.getDistance(
        currentPos.coords, {
        latitude: targetPos.latitude, 
        longitude: targetPos.longitude
    });

    return { 
        withinDistance: distance <= radius,
        distance
    };
}