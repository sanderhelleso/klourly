import React, { Component } from 'react'
import MapContainer from '../../../../maps/MapContainer';
import NextStage from '../NextStage';


export default class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Confirm Room Location'
        }
    } 


    render() {
        return (
            <div className="col s12 map-cont">
                <MapContainer />
                <NextStage message={this.state.message} valid={true} />
            </div>
        )
    }
}
