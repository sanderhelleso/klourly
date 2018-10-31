import React, { Component } from 'react'
import MapContainer from '../../../../maps/MapContainer';
import NextStage from '../NextStage';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../../../actions/newRoom/nextStageAction';


class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Continue',
            valid: false
        }
    } 

    componentWillMount() {
        document.title = 'Creating New Room | Step 5 / 7 | Klourly'
    }

    
    setMapStatus(e) {
        if (e.target.checked) {
            document.querySelector('#main-map-cont').className = 'newRoom-maps-cont-active';
        }

        else {
            document.querySelector('#main-map-cont').className = 'newRoom-maps-cont-disabled';
        }
    }

    render() {
        return (
            <div className="col s12 map-cont">
                <MapContainer />
                <div className="switch">
                <label>
                    Disable Room Geolocation
                    <input type="checkbox" defaultChecked={true} onChange={(event) => this.setMapStatus(event)}/>
                    <span className="lever"></span>
                    Activate Room Geolocation
                </label>
                </div>
                <NextStage message={this.state.message} valid={false} />
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
