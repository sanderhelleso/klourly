import React, { Component } from 'react';
import styled from 'styled-components';

// import component style
import '../styles/dashboardSettings.css';

import DashboardDate from './DashboardDate';
import Options from './Options';


export default class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledAside id='dashboard-settings' className='col s12 m12 l3 z-depth-2 animated fadeIn'>
                <Options />
                <SettingsBody>
                    <DashboardDate />
                </SettingsBody>
            </StyledAside>
        )
    }
}

const StyledAside = styled.aside`
    position: relative;
    background: #6a3093;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #a044ff, #6a3093);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #a044ff, #6a3093); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    min-height: 100vh !important;
`;

const SettingsBody = styled.div`
    padding: 2rem 1rem;
`;
