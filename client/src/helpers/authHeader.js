export const authHeader = () => {

    // return authorization header token
    const user = localStorage.getItem('user');

    if (user) return { 'Authorization': 'Bearer ' + JSON.parse(user).token };

    else return {};
}