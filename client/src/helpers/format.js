export const format = {
    capitalize,
    tsToDate,
    removeByKey,
    getPercentage,
    tsToHHMM,
    getFormatedDateAndTime,
    dateStringToTs,
    validateMembers
}

// capitalize given string
function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1).toLowerCase()}`;
}

// convert a timestamp to date
function tsToDate(timestamp) {
    return new Date(timestamp).toDateString();
}

// get ts from a date string
function dateStringToTs(time) {
    const now = new Date();
    const dateString = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${time}`;
    return new Date(dateString).getTime();
}

// convert a timestamp to HH:MM
function tsToHHMM(timestamp) {
    const date = new Date(timestamp);
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
}

function getFormatedDateAndTime(timestamp) {
    return `${tsToDate(timestamp)} ${tsToHHMM(timestamp)}`;
}

// remove key from object
function removeByKey (obj, deleteKey) {
    return Object.keys(obj)
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = obj[current];
        return result;
    }, {});
}

function getPercentage(num1, num2) {
    return Math.round((num1 / num2) * 100);
}

function validateMembers(membersList) {
    if (typeof membersList[0] === 'object') {
        return membersList.map(m => m.id);
    }

    return membersList;
}