import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

export default class Times extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>qweqwe</li>
                    <li>32131</li>
                    <li>ewqeq</li>
                </ul>
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(Times);
