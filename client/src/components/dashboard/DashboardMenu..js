import React, { Component } from 'react';
import { Map, Clipboard, Activity, Settings} from 'react-feather';

import './styles/dashboardMenu.css';

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
        const options = Array.from(document.querySelectorAll('.menu-item'));
        const selectedOption = e.target;
        for (let i = 0; i < options.length; i++) {

            if (options[i] === selectedOption) {
                options[i].className = 'menu-item menu-item-active';

                // update state with selected option to render main dashboard
                this.props.dashboardActions(i + 1);
            }

            else {
                options[i].className = 'menu-item';
            }
        }
    }

    render() {
        return (
            <aside id='dashboard-menu' className='col l2'>
                <div className='col l12 menu-item' onClick={this.toogleMenuOption} >
                    <Activity size={30} />
                </div>
                <div className='col l12 menu-item menu-item-active' onClick={this.toogleMenuOption}>
                    <Clipboard size={30} />
                </div>
                <div className='col l12 menu-item' onClick={this.toogleMenuOption}>
                    <Map size={30} />
                </div>
                <div className='col l12 menu-item' onClick={this.toogleMenuOption}>
                    <Settings size={30} />
                </div>
            </aside>
        )
    }
}

// update dashboard state
const mapDispatchToProps = (dispatch) => {
    console.log(dispatch);
    return bindActionCreators({ dashboardActions }, dispatch);
}

export default connect(null, mapDispatchToProps)(DashboardMenu);