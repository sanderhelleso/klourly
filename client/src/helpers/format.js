
// client
export const format = {
    capitalize
}

// capitalize given string
function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1).toLowerCase()}`;
}