export const authHeader = () => {

    // return authorization header token
    try {

        const serializedState = localStorage.getItem('state');
        if (serializedState) return { Authorization: `Bearer ${JSON.parse(serializedState).auth.user.token}` };
        return {};
    } 
    
    catch (error) { return {} };
}