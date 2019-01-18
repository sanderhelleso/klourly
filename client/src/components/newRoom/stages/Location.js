import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { materializeJS } from '../../../helpers/materialize';

import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import { notification } from '../../../helpers/notification';
import SelectLocationMap from '../../maps/SelectLocationMap';


class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationAddress: '',
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.locationAddress === 'loading') this.setState({ loading: true });

        else {

            const textarea = document.querySelector('#address');

            this.setState({
                locationAddress: nextProps.locationAddress,
                loading: false
            });

            setTimeout(() => {
                materializeJS.M.textareaAutoResize(textarea);
                textarea.focus();
            }, 10);
        }
    }

    render() {
        return (
            <StyledLocation>
                <SelectLocationMap />
                <div className="row">
                    <div className="textarea-cont input-field col s12">
                        <textarea
                            value={this.state.locationAddress} 
                            className="materialize-textarea"
                            id="address" 
                            type="text"
                            disabled={this.state.loading}
                            onChange={(e) => this.setState({ locationAddress: e.target.value })}
                        />
                        <label className="active" htmlFor="address">Location Address</label>
                        <span class="helper-text">
                            {
                                this.state.loading 
                                ? 'Fetching location address...' 
                                : 'Leave empty for no address'
                            }
                        </span>
                    </div>
                </div>
            </StyledLocation>
        )
    }
}


const mapStateToProps = state => {
    return { 
        locationAddress: state.dashboard.newRoom.locationAddress
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);


const StyledLocation = styled.div`
    
    .textarea-cont {
        margin-top: 4rem;
    }
`;
