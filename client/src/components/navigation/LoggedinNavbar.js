import React, { Component } from 'react';
import styled from 'styled-components';
import NavOptions from './NavOptions';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logoutActions } from '../../actions/logoutActions';


class LoggedinNavbar extends Component {
    render() {
        return (
            <StyledActionBtn className="fixed-action-btn">
                <StyledFloatMenu className="btn-floating btn-large waves-effect waves-circle waves-light">
                    <img 
                        id='user-avatar' 
                        src={this.props.userAvatar} 
                        className='z-depth-2 animated fadeIn' 
                        alt={`${this.props.name} 's avatar`}
                    />
                </StyledFloatMenu>
                <ul>
                </ul>
            </StyledActionBtn>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoggedinNavbar);

const StyledNav = styled.div`
    width: 300px;
    position: fixed;
    box-shadow: 0px 9px 28px rgba(0,0,0,0.09);
    right: 30px;
    top: 30px;
    height: 55px;
    background: #9796f0;
    background: -webkit-linear-gradient(to right,#fbc7d4,#9796f0);
    background: linear-gradient(to right,#fbc7d4,#9796f0);
    border-radius: 70px;
    transform: scale(1.01);
    z-index: 100000;
`;

const StyledActionBtn = styled.div`
    top: 5px;
    bottom: none;
`;


const StyledFloatMenu = styled.a`

    box-shadow: 0px 18px 56px rgba(0,0,0,0.2);

    &:hover {
        box-shadow: 0px 18px 56px rgba(0,0,0,0.3);
    }
    
    img {
        position: relative;
        width: 56px;
        height: 56px;
    }
`