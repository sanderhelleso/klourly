import { toast } from 'react-toastify';

export const notification = {
    login,
    signup,
    settings,
    newRoomName
}

// login notification
function login(success) {

    // prompt success toast if login was successfull
    if (success) {
        toast('Login Successfull! Redirecting...', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-success',
            progressClassName: 'success-progress-bar',
            autoClose: 2000,
            toastId: 1
        });
    }

    // propmt error toast if login failes
    else {
        toast('Invalid e-mail or password. Please try again', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-error',
            progressClassName: 'error-progress-bar',
            toastId: 2
        });
    }
}

// signup notification
function signup(success, message) {

    // prompt success toast if signup was successfull
    if (success) {
        toast('Sign Up successfull! Taking you to our login page...', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-success',
            progressClassName: 'success-progress-bar',
            autoClose: 2000,
            toastId: 1
        });
    }

    // propmt error toast if signup failes
    else {
        toast(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-error',
            progressClassName: 'error-progress-bar',
            toastId: 2
        });
    }
}

// signup notification
function settings(success, message) {

    // prompt success toast if signup was successfull
    if (success) {
        toast(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-success',
            progressClassName: 'success-progress-bar',
            autoClose: 3000,
            toastId: 1
        });
    }

    // propmt error toast if signup failes
    else {
        toast(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-error',
            progressClassName: 'error-progress-bar',
            toastId: 2
        });
    }
}

// new room name error notification
function newRoomName() {

    // prompt error if name is longer than 55 characters
    toast('Room name cant be longer than 55 characters!', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-error',
        progressClassName: 'error-progress-bar',
        autoClose: 3000,
        toastId: 1
    });
}

