import React, { Component } from 'react';
import styled from 'styled-components';
import NavOptions from './NavOptions';
import { materializeJS } from '../../helpers/materialize';
import { LogOut, Menu, X } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logoutActions } from '../../actions/logoutActions';


class LoggedinNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = { active: false };
    }

    componentDidMount() {
        materializeJS.M.FloatingActionButton.init(
            document.querySelectorAll('.fixed-action-btn'), {
            hoverEnabled: false
        });
    }

    render() {
        return (
            <StyledActionBtn className="fixed-action-btn">
                <StyledFloatMenu 
                    className="btn-floating btn-large waves-effect waves-circle waves-light"
                    onClick={() => this.setState({ active: this.state.active ? false : true })}
                >
                    {this.state.active ? <X size={22} /> : <Menu size={22} />}
                </StyledFloatMenu>
                <ul>
                    <li>
                        <a 
                            className="btn-floating btn waves-effect waves-circle waves-light sub"
                        >
                        <img 
                            id='user-avatar' 
                            src={this.props.userAvatar} 
                            className='z-depth-2 animated fadeIn' 
                            alt={`${this.props.name} 's avatar`}
                        />
                        </a>
                    </li>
                    <li>
                        <a 
                            className="btn-floating btn-large waves-effect waves-circle waves-light logout sub"
                            onClick={() => this.props.logoutActions()}
                        >
                            <LogOut size={19} />
                        </a>
                    </li>
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

    text-align: center;

    svg {
        margin-top: 17px;
    }

    .sub {
        height: 48px;
        width: 48px;

        svg {
            margin-top: 14.5px;
            margin-left: 2px;
        }

    }

    img {
        position: relative;
        width: 48px;
        height: 48px;
    }

    .logout {
        background-color: #ff5252;
    }
`;


const StyledFloatMenu = styled.a`

    transform: scale(1.05);
    background: #DA22FF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */



    &:hover {
        background: #DA22FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
`