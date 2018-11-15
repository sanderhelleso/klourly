export const authHeader = () => {

    // return authorization header user UID
    const user = localStorage.getItem('user');
    console.log(JSON.parse(user).id);
    if (user) {
        return { 'Authorization': 'Bearer ' + JSON.parse(user).id };
    } else {
        return {};
    }
}