import React, { Component } from 'react'
import styled from 'styled-components';
import { redirect } from '../../helpers/redirect';
import { Settings, Users, BarChart2, MessageSquare, CheckCircle } from 'react-feather';
import { materializeJS } from '../../helpers/materialize';

export default class Menu extends Component {

    componentDidMount() {
        materializeJS.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});
    }


    render() {
        return (
            <StyledMenu 
                className="dropdown-trigger"
                data-target="room-menu"
            >
                <Settings size={35} />
                <ul id="room-menu" className="dropdown-content">
                    <li onClick={() => {redirect.roomAdminMembers(this.props.id)}}><a><CheckCircle /> Checkin</a></li>
                    <li onClick={() => {redirect.roomAdminMembers(this.props.id)}}><a><Users /> Members</a></li>
                    <li onClick={() => {redirect.roomAdminReports(this.props.id)}}><a><BarChart2 /> Reports</a></li>
                    <li onClick={() => {redirect.roomAdminSettings(this.props.id)}}><a><Settings /> Settings</a></li>
                </ul>
            </StyledMenu>
        )
    }
}

const StyledMenu = styled.div`
    
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10000;

    svg {
        stroke: #ffffff;
        opacity: 0.5;
    }
`;

