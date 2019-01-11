import React, { Component } from 'react';

export default class Filter extends Component {
    render() {
        return (
            <div>
                <p>
                    <label>
                        <input name="group1" type="radio" />
                        <span>Most Recent</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio"/>
                        <span>Last 3 days</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio" />
                        <span>Last 7 days</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio" />
                        <span>Last 28 days</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio" />
                        <span>Last 180 days</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio" />
                        <span>Last 365 days</span>
                    </label>
                </p>
            </div>
        )
    }
}
