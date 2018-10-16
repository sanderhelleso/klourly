import { toast } from 'react-toastify';

export const notification = {
    login
}

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

