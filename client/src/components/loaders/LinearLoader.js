import React, { Component } from 'react';

export default class componentName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true
        }
    }

    // unmounts loader when loading state is finished
    // 800ms timeout to preserve fade out animation
    componentWillReceiveProps(nextProps) {
        if (this.props.loading !== nextProps.loading) {
            setTimeout(() => {
                this.setState({
                    active: false
                });
            }, 800);
        }
    }

    renderLineadLoader() {
        if (this.state.active) {
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

        return null;
    }

    render() {
        return this.renderLineadLoader();
    }
}
