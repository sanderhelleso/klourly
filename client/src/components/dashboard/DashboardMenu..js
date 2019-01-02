import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, Activity, Settings, Grid} from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dashboardActions } from '../../actions/dashboardActions';


class DashboardMenu extends Component {
    constructor(props) {
        super(props);

        this.toogleMenuOption = this.toogleMenuOption.bind(this);
    }

    // select specific menu option
    toogleMenuOption(e) {

        // get all possible options
        const options = Array.from(document.querySelectorAll('.menu-item'));

        // itterate over options and update dashboard
        options.forEach(option => {

            // current option index
            let index = options.indexOf(option);

            // check if matching
            if (option === e.target) {

                options[index].className = 'menu-item menu-item-active';

                // update state with selected option to render dashboard sections
                this.props.dashboardActions(index + 1);
            }

            else {

                // set to default if not active
                options[index].className = 'menu-item';
            }
        });
    }

    componentDidMount() {

        // activate menu
        document.querySelector('.menu-item-active').click();
    }

    render() {
        return (
            <StyledMenu id="dashboard-menu" className="col s12 m12 l2">
                <div className="menu-item" onClick={this.toogleMenuOption} >
                    <Activity size={30} />
                </div>
                <div className="menu-item menu-item-active" onClick={this.toogleMenuOption}>
                    <Grid size={30} />
                </div>
                <div className="menu-item" onClick={this.toogleMenuOption}>
                    <Map size={30} />
                </div>
                <div className="menu-item" onClick={this.toogleMenuOption}>
                    <Settings size={30} />
                </div>
            </StyledMenu>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({ dashboardActions }, dispatch);
}

export default connect(null, mapDispatchToProps)(DashboardMenu);


const StyledMenu = styled.aside`
    margin: 10vh 0 10vh 0;
    height: 80vh;

    .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 25% !important;
        border-right: 1px solid #e0e0e0;
        opacity: 0.5;
        cursor: pointer;
        transition: 0.3s ease-in-out;
    }

    .menu-item-active {
        border-right: 1px solid #b388ff;
        opacity: 1;
        transition: 0.3s ease-in-out;
    }

    .menu-item-active svg {
        stroke: #b388ff !important;
    }

    .menu-item svg {
        stroke: #bdbdbd;
        z-index: -1;
    }

    .menu-item:hover {
        opacity: 1;
    }

    .menu-item:hover svg {
        stroke: #b388ff !important;
    }

    @media (max-width: 993px) {
        margin: 0;
        height: 70px;
        border-right: none;
        position: fixed;
        bottom: 0;
        z-index: 100000;
        background-color: #b388ff;
        -webkit-box-shadow: 0px -1px 30px 0px rgba(0, 0, 0, 0.2);
        -moz-box-shadow:    0px -1px 30px 0px rgba(0, 0, 0, 0.2);
        box-shadow:         0px -1px 30px 0px rgba(0, 0, 0, 0.2);

        .menu-item {
            float: left;
            min-width: 25%;
            min-height: 100% !important;
            border-right: none;
        }

        .menu-item-active {
            border-right: none;
            opacity: 1;
            transition: 0.3s ease-in-out;
        }

        .menu-item svg {
            height: 22px;
            width: 22px;
            stroke: #ffffff;
        }

        .menu-item-active svg {
            stroke: #ffffff !important;
        }

        .menu-item:hover svg {
            stroke: #ffffff !important;
        }
    }
`;
