export const regex = {
    email,
    upperCase,
    lowerCase,
    number,
    special
}

// email validation
const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// uppercase char
const upperCase = /[A-Z]/;

// lowercase char
const lowerCase = /[a-z]/; 

// is number char
const number = /[0-9]/;

// is special char
const special = /[!|@|#|$|%|^|&|*|(|)|-|_]/; 