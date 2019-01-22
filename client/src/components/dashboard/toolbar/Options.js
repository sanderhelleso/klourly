import React, { Component } from 'react';
import { LogOut, Bell } from 'react-feather';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logoutActions } from '../../../actions/logoutActions';


class Options extends Component {
    constructor(props) {
        super(props);
    }

    // logout user, clearing localstorage and app state
    logOut = () => {
        localStorage.clear();
        this.props.logoutActions();
    }

    render() {
        return (
            <StyledOptions className='col l12'>
                <div className='col l2'>
                    <Bell size={20} />
                </div>
                <div className='col l8 avatar-cont animated fadeIn'>
                    <img 
                        id='user-avatar' 
                        src={this.props.userAvatar} 
                        className='z-depth-2 animated fadeIn' 
                        alt={`${this.props.name} 's avatar`}
                    />
                    <span 
                        id='user-name' 
                        className='animated fadeIn'
                    >
                        {this.props.name}
                    </span>
                </div>
                <div className='col l2 log-out-cont' onClick={this.logOut}>
                    <LogOut size={20} />
                </div>
            </StyledOptions>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userAvatar: state.dashboard.userData.settings.photoUrl,
        name: state.dashboard.userData.settings.displayName
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logoutActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);

const StyledOptions = styled.div`

    text-align: center;
    color: #ffffff;
    padding: 1.25rem !important;
    border-bottom: 0.5px solid #ac73ff;

    svg {
        opacity: 0.5;
        margin-top: 0.5rem;
    }

    .avatar-cont {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #user-avatar {
        margin-right: 0.5rem;
        min-height: 35px;
        min-width: 35px;
        max-height: 35px;
        max-width: 35px;
        border-radius: 50%;
        width: auto;
    }

    #user-name {
        font-size: 14px;
        opacity: 0.8;
        font-weight: 100;
        letter-spacing: 1px;
    }

    .log-out-cont {
        cursor: pointer;
    }
`;