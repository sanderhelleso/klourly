import React, { Component } from 'react';
import { Camera, Trash2 } from 'react-feather';
import styled from 'styled-components';
import { dashboard } from '../../../../api/dashboard/dashboard';
import { notification } from '../../../../helpers/notification';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { avatarActions } from '../../../../actions/avatarActions';


class ChangeAvatar extends Component {
    constructor(props) {
        super(props);

                this.defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/default%2Favatar.svg?alt=media&token=330f9231-7f20-431a-bfcb-0fb504aebff9';

    }

    // trigger hidden file input on avatar click
    selectAvatar = () => {
        if (this.props.verified) {
            document.querySelector('#avatar-input').click();
        }
    }

    requireVerification = () => {
        notification.error('Your account needs to be verified to perform this action. Please click the link sent to the account registered e-mail address.');
    }

    updateAvatar = async e => {

        // create file blob
        const file = e.target.files[0];
        const extension = file.name.split('.').pop();

        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {
            notification.error('Invalid file format. Please select a PNG or JPG image');
            e.target.value = '';
            return;
        }

        const fd = new FormData();

        // send blob to server, store and set avatar and state
        fd.append('file', file, `avatar.${this.props.userID}.${extension}`);

        // attempt to upload image
        const response = await dashboard.uploadAvatar(fd);

        // check if image was successfully uploaded
        if (response.data.success) {

            // update state for avatar (userData)
            notification.success('Successfully updated avatar! Your new avatar will be live around Klourly in a bit');
            this.props.avatarActions(response.data.photoUrl);
        }

        // something went wrong with upload 
        else {
            notification.error(response.data.message);
        }
    }

    removeAvatar = async () => {

        // attempt to remove current avatar from user
        const response = await dashboard.removeAvatar(this.props.userID);

        // check if image was successfully removed
        if (response.data.success) {

            // update state for avatar (userData)
            this.props.avatarActions(response.data.defaultAvatar);
            notification.success('Avatar has been removed');
        }

        // something went wrong with removal
        else {
            notification.error(response.data.message);
        }
    }

    renderRemoveAvatar() {

        if (this.props.photoUrl === this.defaultAvatar) return;

        return (
            <div 
                className="remove-img waves-effect waves-light z-depth-1"
                onClick={this.removeAvatar}
            >
                <span>
                    <Trash2 />
                </span>
            </div>
        )
    }

    render() {
        return (
            <StyledAvatar className='col s12 m12 l3 change-avatar-cont'>
                <div className='change-avatar-cont-overlay'>
                    <img 
                        id='change-avatar' 
                        src={this.props.photoUrl} 
                        className='z-depth-2 animated fadeIn' 
                        alt='Change avatar'
                    />
                    {this.renderRemoveAvatar()}
                    <input 
                        id='avatar-input' 
                        type='file' 
                        onChange={(e) => this.props.verified ? this.updateAvatar(e) : null}
                        accept="image/jpeg, image/png"
                    />
                    <div 
                        className='avatar-overlay'
                         onClick={this.props.verified ? this.selectAvatar : this.requireVerification}>
                        <div className='avatar-text'
                    >
                            <Camera size={40} />
                            <span>
                                Change Avatar
                            </span>
                        </div>
                    </div>
                </div>
            </StyledAvatar>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ avatarActions }, dispatch);
}

const mapStateToProps = state => {
    return {
        verified: state.auth.user.verified,
        userID: state.auth.user.id,
        photoUrl: state.dashboard.userData.settings.photoUrl
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar);

const StyledAvatar = styled.div`

    margin-top: 5vh;
    position: relative;

    #change-avatar {
        width:  150px;
        height: 150px;
        background-position: 50% 50%;
        background-repeat:   no-repeat;
        background-size:     cover;
        margin: 0 auto;
        border-radius: 50%;
        cursor: pointer;
    }

    #change-avatar-title {
        font-size: 1rem;
        text-align: center;
        color: #9e9e9e;
        font-weight: 400;
        opacity: 0.7;
    }

    #avatar-input {
        display: none;
    }

    #avatar-input {
        display: none;
    }

    .change-avatar-cont-overlay {
        width:  150px;
        height: 150px;
        margin: 0 auto;
        border-radius: 50%;
        position: relative;
    }

    @media screen and (max-width: 993px) {

        margin-top: 2.5vh;
        
        #change-avatar {
            width:  120px;
            height: 120px;
        }

        .change-avatar-cont-overlay {
            width:  120px;
            height: 120px;
        }
    }

    .change-avatar-cont-overlay:hover .avatar-overlay {
        opacity: 1;
    }
    
    .avatar-text {
        color: white;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .avatar-text span {
        font-size: 0.725rem;
    }

    .avatar-overlay {
        cursor: pointer;
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: 0.5s ease-in-out;
        background-color: rgba(20, 20, 20, 0.8);
    }

    .remove-img {
        position: absolute;
        bottom: 5px;
        right: 5px;
        border-radius: 50%;
        background-color: #ef5350;
        text-align: center;
        width: 40px;
        height: 40px;
        z-index: 10000;
        transition: 0.3s;
        cursor: pointer;
        span {
            display: block;
            margin-top: 10px;

            svg {
                height: 18px;
                width: 18px;
                stroke: #ffcdd2;
            }
        }
    }
`;
