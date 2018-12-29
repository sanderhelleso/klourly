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
    roomAdminSettings,
    roomAdminMembers,
    roomAdminReports,
    loginWithJoinRoomRedirect,
    redirectActionSuccess
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
    history.push(`/dashboard/rooms/${id}/admin/settings`);
}

function roomAdminMembers(id) {
    history.push(`/dashboard/rooms/${id}/admin/members`);
}

function roomAdminReports(id) {
    history.push(`/dashboard/rooms/${id}/admin/reports`);
}

function roomAdminAnnouncements(id) {
    history.push(`/dashboard/rooms/${id}/admin/announcements`);
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

function loginWithJoinRoomRedirect(inviteID, roomID) {
    history.push({
        pathname: '/login',
        search: `?redirect=true&inviteID=${inviteID}&roomID=${roomID}&cb=joinRoom`,
    });
}

function redirectActionSuccess(cb, roomID, userID) {

    // redirect depending on callback
    switch (cb) {
        case 'joinRoom':
            room(roomID);
            break;

        default: break;
    }
}