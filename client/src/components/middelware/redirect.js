import history from './history';
import { enterRoomActions } from '../../actions/enterRoomActions';

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

function room(props, roomData, id) {

     // set state and redirect to room
    props.enterRoomActions(roomData);
    history.push(`/dashboard/rooms/${id}`);
}

function newRoom() {
    history.push('/dashboard/new-room');
}

function joinRoom(url) {
    history.push(url);
}