import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { startLoading, finishLoading } from './ui';
import { noteLogout } from './notes';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );
        Swal.fire({
            title: 'Loading',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
        
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ));
                dispatch( finishLoading() );
                Swal.close();
                Swal.fire('Good job', 'You logged in successfully', 'success');
            })
            .catch( e => {
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

        
        
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {

        dispatch( startLoading() );
        Swal.fire({
            title: 'Loading',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                );

                dispatch( finishLoading() );
                Swal.close();
                Swal.fire('Good job', 'You registered in successfully', 'success');
            })
            .catch( e => {
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

    }
}



export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });

    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const startLogout = () => {
    
    return async( dispatch ) => {
        Swal.showLoading();
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );
        Swal.close();
        Swal.fire('Bye', 'You logged out successfully', 'success');
    }
}


export const logout = () => ({
    type: types.logout
})


