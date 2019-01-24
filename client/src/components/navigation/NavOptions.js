import React, { Component } from 'react';
import { LogOut, Bell } from 'react-feather';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logoutActions } from '../../actions/logoutActions';


class NavOptions extends Component {
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
                    <Bell size={23.5} />
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
                        {this.props.name.split(' ')[0]}
                    </span>
                </div>
                <div className='col l2 log-out-cont' onClick={this.logOut}>
                    <LogOut size={23.5} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NavOptions);

const StyledOptions = styled.div`

    text-align: center;
    color: #ffffff;
    margin-top: 7.5px;

    svg {
        opacity: 0.7;
        margin-bottom: -13.5px;
        stroke: #ffffff;
        cursor: pointer;
    }

    .avatar-cont {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin-top: 5px;
    }

    #user-avatar {
        margin-right: 0.5rem;
        min-height: 30px;
        min-width: 30px;
        max-height: 30px;
        max-width: 30px;
        border-radius: 50%;
        width: auto;
    }

    #user-name {
        font-size: 14px;
        opacity: 0.8;
        font-weight: 600;
        letter-spacing: 1px;
        margin-left: 5px;
    }
`;