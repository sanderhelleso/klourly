export function authHeader() {

    // return authorization header user UID
    const user = localStorage.getItem('user');

    if (user) {
        console.log(user);
        return { 'Authorization': 'Bearer ' + user.id };
    } else {
        return {};
    }
}