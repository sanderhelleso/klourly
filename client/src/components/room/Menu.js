import React from 'react';
import { redirect } from '../../helpers/redirect';
import { Settings, Users, BarChart2, MessageSquare } from 'react-feather';

const Menu = props => (
    <ul id="room-menu" className="dropdown-content">
        <li onClick={() => {redirect.roomAdminMembers(props.id)}}><a><Users /> Members</a></li>
        <li onClick={() => {redirect.roomAdminReports(props.id)}}><a><BarChart2 /> Reports</a></li>
        <li onClick={() => {redirect.roomAdminSettings(props.id)}}><a><Settings /> Settings</a></li>
    </ul>
)

export default Menu;
