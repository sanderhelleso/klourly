import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, Clipboard, Activity, Settings, Grid} from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dashboardActions } from '../../actions/dashboardActions';


class DashboardMenu extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.toogleMenuOption = this.toogleMenuOption.bind(this);
    }

    // select specific menu option
    toogleMenuOption(e) {
        const options = Array.from(document.querySelectorAll('.menu-item'));
        const selectedOption = e.target;
        for (let i = 0; i < options.length; i++) {

            if (options[i] === selectedOption) {
                options[i].className = 'menu-item menu-item-active';

                // update state with selected option to render main dashboard
                this.props.dashboardActions(i + 1);
                localStorage.setItem('dashboardOption', i + 1);
            }

            else {
                options[i].className = 'menu-item';
            }
        }
    }

    componentDidMount() {
        document.querySelector('.menu-item-active').click();
    }

    render() {
        return (
            <StyledMenu id='dashboard-menu' className='col s12 m12 l2'>
                <div className='col l12 menu-item' onClick={this.toogleMenuOption} >
                    <Activity size={30} />
                </div>
                <div className='col l12 menu-item menu-item-active' onClick={this.toogleMenuOption}>
                    <Grid size={30} />
                </div>
                <div className='col l12 menu-item' onClick={this.toogleMenuOption}>
                    <Map size={30} />
                </div>
                <div className='col l12 menu-item' onClick={this.toogleMenuOption}>
                    <Settings size={30} />
                </div>
            </StyledMenu>
        )
    }
}


// update dashboard state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ dashboardActions }, dispatch);
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);

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
`;
