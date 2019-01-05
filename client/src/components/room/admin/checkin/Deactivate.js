import React, { Component } from 'react';
import styled from 'styled-components';

export default class Deactivate extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        return (
            <div className="col s6">
                <button
                    className={`waves-effect waves-light ${this.props.active ? 'active-btn' : 'disabled-btn'}`}
                    disabled={!this.props.active}
                >
                    Deactivate
                </button>
            </div>
        )
    }
}