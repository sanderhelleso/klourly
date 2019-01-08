import React, { Component } from 'react';
import * as firebase from 'firebase';


export default class Messaging extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            messaging: firebase.messaging(),
            permissionGranted: false

        }
        this.messagingConfig();
    }

    messagingConfig() {
    
        // prompt for permission
        this.state.messaging.requestPermission().then(() => {
            console.log('Notification permission granted.');

            // update permission state
            this.setState({ permissionGranted: true });
            this.recieveMessages();
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
    
          }).catch(error => {
            console.log('Unable to get permission to notify.', error);
        });           
    };

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
