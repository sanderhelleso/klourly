import React, { Component } from 'react';
import styled from 'styled-components';
import { notification } from '../../../../helpers/notification';

import { dashboard } from '../../../../api/dashboard/dashboard';
import ChangeAvatar from './ChangeAvatar';
import Form from './Form';

export default class Settings extends Component {

    render() {
        return (
            <StyledSettings className='animated fadeIn'>
                <h3 id='dashboard-title'>Settings</h3>
                <p id='dashboard-intro'>Customize your profile settings</p>
                <div className="row">
                    <div className="col l3">
                        <ChangeAvatar />
                    </div>
                    <Form />
                </div>
            </StyledSettings>
        )
    }
}


const StyledSettings = styled.div`

    #confirm-settings {
        margin-top: 4rem;
    }

    #confirm-settings .btn {
        min-width: 100%;
        margin-top: 1.5rem;
        font-weight: 100;
        font-size: 12px;
        letter-spacing: 1px;
    }

    #cancel-settings-btn {
        background-color: #eeeeee;
        color: #616161;
    }

    #confirm-settings-btn {
        background-color: #04d47e;
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
`;
