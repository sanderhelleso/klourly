import history from './history';

export const redirect = {
    home,
    signup,
    login,
    dashboard,
    room
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

function room(name, id) {
    history.push(`/dashboard/rooms/${name}/${id}`);
}