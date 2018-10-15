import history from './history';

export const redirect = {
    home,
    signup,
    login,
    dashboard
};

function home() {
    history.push('/');
}

function signup() {
    history.push('/signup');
}

function login() {
    history.push('/login');
}

function dashboard() {
    history.push('/dashboard');
}