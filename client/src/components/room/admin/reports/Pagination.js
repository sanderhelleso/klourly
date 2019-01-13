import React, { Component } from 'react'

export default class Pagination extends Component {
    render() {
        return (
            <div className="col s12">
                <ul className="pagination">
                    <li className="active"><a href="#!">1</a></li>
                    <li className="waves-effect"><a href="#!">2</a></li>
                </ul>
            </div>
        )
    }
}
