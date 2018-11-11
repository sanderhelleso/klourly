import history from './history';

export const redirect = {
    home,
    signup,
    login,
    dashboard,
    rooms,
    settings,
    room,
    newRoom,
    joinRoom,
    announcement,
    roomAdminSettings
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

function settings() {
    history.push('/dashboard/settings');
}

function rooms() {
    history.push('/dashboard/rooms');
}

function room(id) {
    history.push(`/dashboard/rooms/${id}`);
}

function roomAdminSettings(id) {
    history.push(`/dashboard/rooms/${id}/admin`);
}

function announcement(roomId, announcementId) {
    history.push(`/dashboard/rooms/${roomId}/announcements/${announcementId}`);
}

function newRoom() {
    history.push('/dashboard/new-room');
}

function joinRoom(url) {
    history.push(url);
}