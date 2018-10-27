import React from "react";
import NewRoomMap from "./NewRoomMap";
import { dashboard } from '../../middelware/dashboard';

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapKey : ''
        }
    }

    async componentWillMount() {
        await dashboard.getMapKey()
        .then(response => {
            this.setState({
                mapKey: response.data.key
            });
        });
    }

	render() {
		return (
			<NewRoomMap
				results={this.props.results}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.state.mapKey}&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px`, width: `800px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}