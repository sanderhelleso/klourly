import React, { Component } from 'react'
import Reactions from './Reactions';

export default class Announcement extends Component {
    constructor() {
        super();


        this.state = {
            title: 'Welcome Students!',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim placerat augue id tristique. Nullam et erat mi. Donec at sagittis odio, nec venenatis nulla. Donec accumsan sagittis metus id feugiat. Aliquam justo risus, egestas non ipsum ac, imperdiet lobortis purus. Aliquam erat volutpat. Cras arcu eros, porttitor id libero a, elementum eleifend tellus. Morbi ullamcorper, felis sit amet lacinia ornare, leo enim fringilla nulla, sed mattis urna nibh in nisi.',
            date: '04.11.2018'
        }
    }

    render() {
        return (
            <div className="col s12 animated fadeIn announcement">
                <h5>{this.state.title}</h5>
                <span>{this.state.date}</span>
                <p>{this.state.body}</p>
                <Reactions />
            </div>
        )
    }
}
