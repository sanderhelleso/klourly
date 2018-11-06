import React, { Component } from 'react'
import Reactions from './Reactions';
import { ArrowRight } from 'react-feather';

export default class Announcement extends Component {
    constructor(props) {
        super(props);

        this.state = props.data;
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
