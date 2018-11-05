import React, { Component } from 'react'

export default class Reactions extends Component {
    render() {
        return (
            <div className="reactions col s10">
                <div className="col s2">
                    <span>😄 0</span>
                </div>
                <div className="col s2">
                    <span>😍 0</span>
                </div>
                <div className="col s2">
                    <span>😓 0</span>
                </div>
                <div className="col s2">
                    <span>😅 0</span>
                </div>
                <div className="col s2">
                    <span>😲 0</span>
                </div>
            </div>
        )
    }
}
