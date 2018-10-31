import React, { Component } from 'react'
import MapContainer from '../../../../maps/MapContainer';
import NextStage from '../NextStage';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../../../actions/newRoom/nextStageAction';
import { notification } from '../../../../../../helpers/notification';

class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Continue',
            hint: '(You can always change location later)',
            validLocation: false,
            locationDisabled: false,
            locationName: null,
            placeholder: 'BIT Building Room 215',
            className: 'browser-default animated fadeIn',
            id: 'new-room-name-field',
            type: 'text',
            maxLength: 55
        }

        this.handleLocationName = this.handleLocationName.bind(this);
        this.confirmLocation = this.confirmLocation.bind(this);
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

        this.setState({
            locationDisabled: e.target.checked ? false : true
        });
    }

    handleLocationName(e) {
        const length = e.target.value.length;
        if (length === 55) {
            notification.newRoomName();
        }

        if (length >= 2 && length <= 55) {
            this.setState({
                validLocation: true,
                locationName: e.target.value
            });
        }

        else {
            this.setState({
                validLocation: false,
                locationName: null
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    confirmLocation() {
        if (this.state.validLocation) {
            return(
                <NextStage 
                message={this.state.message} 
                valid={true} 
                data={this.state.locationDisabled 
                    ?
                    {location: {
                        geoLocationDisabled: this.state.locationDisabled,
                        name: this.state.locationName
                    }}
                    :
                    {location: {
                        ...this.props.state.dashboard.newRoom.location,
                        name: this.state.locationName
                    }}}
                />
            )
        }

        else {
            return(
                <NextStage 
                message={this.state.message} 
                valid={false} 
                />
            )
        }
    }

    render() {
        return (
            <div className="col s12 map-cont">
                <div className="switch">
                    <label>
                        Disable Room Geolocation
                        <input type="checkbox" defaultChecked={true} onChange={(event) => this.setMapStatus(event)}/>
                        <span className="lever"></span>
                        Activate Room Geolocation
                    </label>
                    <p id="location-hint">{this.state.hint}</p>
                </div>
                <MapContainer />
                <div className="input-field center">
                    <input 
                    id={this.state.id} 
                    placeholder={this.state.placeholder} 
                    type={this.state.type} 
                    className={this.state.className} 
                    maxLength={this.state.maxLength} 
                    onChange={(event) => this.handleLocationName(event)}
                    />
                    {this.confirmLocation()}
                </div>
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
