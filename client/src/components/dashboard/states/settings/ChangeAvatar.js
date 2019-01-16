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
    }

    // trigger hidden file input on avatar click
    selectAvatar() {
        document.querySelector('#avatar-input').click();
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
        const response = await dashboard.uploadPhoto(fd);

        // check if image was successfully uploaded
        if (response.data.success) {

            // update state for avatar (userData)
            this.props.avatarActions(URL.createObjectURL(file));
            notification.success('Successfully updated avatar!')
        }

        // something went wrong with upload 
        else {
            notification.error(response.data.message);
        }
    }


    render() {
        return (
            <StyledAvatar className='col l3 change-avatar-cont'>
                <div className='change-avatar-cont-overlay'>
                    <img 
                        id='change-avatar' 
                        src={this.props.photoUrl} 
                        className='z-depth-2 animated fadeIn' 
                        alt='Change avatar'
                    />
                    <div className="remove-img waves-effect waves-light">
                        <span><Trash2 /></span>
                    </div>
                    <input 
                        id='avatar-input' 
                        type='file' onChange={(e) => this.updateAvatar(e)}
                        accept="image/jpeg, image/png"
                    />
                    <div className='avatar-overlay' onClick={this.selectAvatar}>
                        <div className='avatar-text'><Camera size={40} /><span>Change Avatar</span></div>
                    </div>
                </div>
            </StyledAvatar>
        )
    }
}

// attempt to update state for avatar and settings
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ avatarActions }, dispatch);
}

const mapStateToProps = state => {
    return { 
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