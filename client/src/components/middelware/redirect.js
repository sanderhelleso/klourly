import history from './history';

export const redirect = {
    home,
    signup,
    login,
    dashboard,
    room,
    newRoom,
    joinRoom
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

function room(id) {
    history.push(`/dashboard/rooms/${id}`);
}

function newRoom() {
    history.push('/dashboard/new-room');
}

function joinRoom(url) {
    history.push(url);
}