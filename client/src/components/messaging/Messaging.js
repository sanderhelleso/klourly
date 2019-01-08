import React, { Component } from 'react';
import * as firebase from 'firebase';
import { messages } from '../../api/messaging/messages';
import { token } from '../../api/messaging/token';


class Messaging extends Component {
    constructor(props) {
        super(props);
        
        // initialize messaging configuration
        this.messaging = firebase.messaging();
        this.messagingConfig();
    }

    messagingConfig() {
    
        // prompt for permission
        this.messaging.requestPermission().then(() => {
            console.log('Notification permission granted.');

            // prepeare to recieve update of token
            this.updateMessagingToken();

            // prepeare to recieve the current token
            this.getMessagingToken();
    
          })
          .catch(error => console.log('Unable to get permission to notify.', error));           
    };

    getMessagingToken() {

        this.state.messaging.getToken().then(async currentToken => {

            // if currentToken exists
            if (currentToken) {

                // send token to server and update if NEEDED
                const setToken = await token.setToken(this.props.userID, currentToken);

                // if setToken was successfully returned, procced client to recieve messages
                if (setToken.data.success) this.recieveMessages();
            }

        })
        .catch(error => this.errorRefetchToken(error));
    }

    updateMessagingToken() {

        // Callback fired if Instance ID token is updated.
        this.messaging.onTokenRefresh(() => {
            this.messaging.getToken().then(refreshedToken => {
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

const mapStateToProps = state => {
    return { userID: state.auth.user.id };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
