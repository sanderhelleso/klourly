import React, { Component } from 'react'
import { redirect } from '../../helpers/redirect';
import { Settings, Users, BarChart2, MessageSquare } from 'react-feather';
import { materializeJS } from '../../helpers/materialize';

export default class Menu extends Component {

    componentDidMount() {
        document.body.style.overflowY = 'auto';
        materializeJS.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});
    }


    render() {
        return (
            <div 
                id="room-admin-settings-btn"
                className="dropdown-trigger"
                data-target="room-menu"
            >
                <Settings size={35} />
                <ul id="room-menu" className="dropdown-content">
                    <li onClick={() => {redirect.roomAdminMembers(this.props.id)}}><a><Users /> Members</a></li>
                    <li onClick={() => {redirect.roomAdminReports(this.props.id)}}><a><BarChart2 /> Reports</a></li>
                    <li onClick={() => {redirect.roomAdminSettings(this.props.id)}}><a><Settings /> Settings</a></li>
                </ul>
            </div>
        )
    }
}

