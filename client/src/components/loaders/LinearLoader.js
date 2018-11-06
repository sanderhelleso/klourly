import React, { Component } from 'react';

export default class componentName extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        return (
            <div className={this.props.loading ? 'linear-loader-cont animated fadeIn' : 'linear-loader-cont animated fadeOut'}>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        )
    }
}
