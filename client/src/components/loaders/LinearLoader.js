import React, { Component } from 'react';

export default class LinearLoader extends Component {
    constructor(props) {
        super(props);
    }

    renderLineadLoader() {
        return (
            <div className={this.props.loading
                ? 'linear-loader-cont animated fadeIn'
                : 'linear-loader-cont animated fadeOut'
            }>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        )
    }

    render() {
        return this.renderLineadLoader();
    }
}
