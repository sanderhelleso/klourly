
// client
export const format = {
    capitalize,
    tsToDate
}

// capitalize given string
function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1).toLowerCase()}`;
}

// convert a timestamp to date
function tsToDate(timestamp) {
    return new Date(timestamp).toDateString();
}