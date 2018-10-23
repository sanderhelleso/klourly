import React, { Component } from 'react';

export default class Days extends Component {

    render() {
        return (
            <li className="animated fadeIn">
                <div className="collapsible-header">{this.props.title}</div>
                <div className="collapsible-body">
                    <p>
                        <label>
                        <input type="checkbox" />
                        <span>Red</span>
                        </label>
                    </p>
                </div>
            </li>
        )
    }
}
