import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, Activity, Settings, Grid} from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dashboardAction } from '../../actions/dashboardAction';


class DashboardMenu extends Component {
    constructor(props) {
        super(props);

        this.size = 30;
        this.menuItems = {
            activity: {
                icon: <Activity size={this.size} />
            },
            rooms: {
                icon: <Grid size={this.size} />
            },
            map: {
                icon: <Map size={this.size} />
            },
            settings: {
                icon: <Settings size={this.size} />
            }
        }
    }

    componentDidMount = () => this.props.dashboardAction(2);

    renderMenuItems() {

        return Object.entries(this.menuItems)
        .map(([itemName, value]) => {

            const itemIndex = Object.keys(this.menuItems).indexOf(itemName) + 1;
            const active = itemIndex === this.props.activeItem ? true : false;

            return (
                <div 
                    key={itemName}
                    className={`menu-item waves-effect ${active ? 'menu-item-active' : ''}`}       
                    onClick={() => active ? {} : this.props.dashboardAction(itemIndex)}
                >
                    {value.icon}
                </div>
            )
        });
    }

   

    render() {
        return (
            <StyledMenu id="dashboard-menu" className="col s12 m12 l2">
               {this.renderMenuItems()}
            </StyledMenu>
        )
    }
}


const mapStateToProps = state => {
    return { activeItem: state.dashboard.dashboardOption };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ dashboardAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);


const StyledMenu = styled.aside`
    margin: 10vh 0 10vh 0;
    height: 80vh;
    padding: 0 !important;

    .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 25% !important;
        opacity: 0.5;
        cursor: pointer;
        transition: 0.3s linear;
        border-right: 3px solid transparent;
    }

    .menu-item-active {
        border-right: 3px solid #b388ff;
        opacity: 1;
    }

    .menu-item-active svg {
        stroke: #b388ff !important;
    }

    .menu-item svg {
        stroke: #bdbdbd;
        pointer-events: none;
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
