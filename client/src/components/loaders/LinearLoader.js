import React, { Component } from 'react';

export default class componentName extends Component {
    constructor(props) {
        super(props);
    }
    
    renderLineadLoader() {
        return (
            <div className="linear-loader-cont animated fadeIn">
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        )
    }

    render() {
        return this.props.loading ? this.renderLineadLoader() : null;
    }
}
