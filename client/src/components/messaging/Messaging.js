import React, { Component } from 'react';
import * as firebase from 'firebase';
import { messages } from '../../api/messaging/messages';


export default class Messaging extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            messaging: firebase.messaging(),
            permissionGranted: false,
            currentToken: false

        }

        // initialize messaging configuration
        this.messagingConfig();
    }

    messagingConfig() {
    
        // prompt for permission
        this.state.messaging.requestPermission().then(() => {
            console.log('Notification permission granted.');

            // update permission state
            this.setState({ permissionGranted: true });

            // prepeare to recieve update of token
            this.updateMessagingToken();

            // prepeare to recieve the current token
            this.getMessagingToken();
    
          })
          .catch(error => console.log('Unable to get permission to notify.', error));           
    };

    getMessagingToken() {

        this.state.messaging.getToken().then(currentToken => {

            // if currentToken return immediatly
            if (currentToken) {

                this.setState({ currentToken: true })
                this.recieveMessages();
                return currentToken;
            }

        })
        .catch(error => this.errorRefetchToken(error));
    }

    updateMessagingToken() {

        // Callback fired if Instance ID token is updated.
        this.state.messaging.onTokenRefresh(() => {
            this.state.messaging.getToken().then(refreshedToken => {
            console.log('Token refreshed.');

            })
            .catch(error => this.errorRefetchToken(error));
        });
    }

    errorRefetchToken(error) {

        // if an error occures, attempt to refetch the messaging token every 5 sec
        console.log('An error occurred while retrieving token. Retrying in 5 seconds', error);
        setTimeout(() => {
            this.getMessagingToken();
        }, 5000);
    }

    recieveMessages() {

        // Handle incoming messages. Called when:
        // - a message is received while the app has focus
        // - the user clicks on an app notification created by a service worker
        this.state.messaging.onMessage(payload => {
            console.log('Message received. ', payload);
            // ...
        });  
    }

    

    render() {
        return null;
    }
}
