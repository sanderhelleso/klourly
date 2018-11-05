import React, { Component } from 'react'
import Reactions from './Reactions';
import { ArrowRight } from 'react-feather';

const ipsums = []

export default class Announcement extends Component {
    constructor() {
        super();


        this.state = {
            title: 'Welcome Students!',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim placerat augue id tristique. Nullam et erat mi. Donec at sagittis odio, nec venenatis nulla. Donec accumsan sagittis metus id feugiat. Aliquam justo risus, egestas non ipsum ac, imperdiet lobortis purus. Aliquam erat volutpat. Cras arcu eros, porttitor id libero a, elementum eleifend tellus. Morbi ullamcorper, felis sit amet lacinia ornare, leo enim fringilla nulla, sed mattis urna nibh in nisi.',
            date: '04.11.2018'
        }
    }


    renderReadMore() {

        if (this.state.body.length > 355) {
            return (
                <div className="col s12 announcement-readmore-cont">
                    <button 
                    className="announcement-readmore-btn waves-effect waves-light btn animated fadeIn">
                    Read more
                    </button>
                </div>
            )
        }

        return null;
    }

    render() {
        return (
            <div className="col s12 animated fadeIn announcement">
                <h5 className="announcement-title">{this.state.title}</h5>
                <span className="announcement-date">{this.state.date}</span>
                <p className="announcement-body">{this.state.body.substring(0, 355)}</p>
                <Reactions />
                {this.renderReadMore()}
            </div>
        )
    }
}
