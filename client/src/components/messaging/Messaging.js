import React, { Component } from 'react';
import * as firebase from 'firebase';
import { token } from '../../api/messaging/token';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


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

        this.messaging.getToken().then(currentToken => {

            // if currentToken exists
            if (currentToken) {

                // send token to server and update if NEEDED
                token.setToken(this.props.userID, currentToken);

                // procced client to recieve messages
                this.recieveMessages();
            }
        })
        .catch(error => this.errorRefetchToken(error));
    }

    updateMessagingToken() {

        // Callback fired if Instance ID token is updated.
        this.messaging.onTokenRefresh(() => {

            // get new updated token
            this.messaging.getToken().then(refreshedToken => {

                // send updated token to server and set for user
                console.log('Token refreshed.');
                token.setToken(this.props.userID, refreshedToken);
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
        this.messaging.onMessage(payload => {
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
