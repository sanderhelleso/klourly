export function authHeader() {
    // return authorization header user UID
    let user = localStorage.getItem('user');

    if (user) {
        return { 'Authorization': 'Bearer ' + user };
    } else {
        return {};
    }
}