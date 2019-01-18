import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { materializeJS } from '../../../helpers/materialize';

import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import SelectLocationMap from '../../maps/SelectLocationMap';

import NextStage from '../NextStage';


class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            initialized: false,
            location: {
                address: '',
                coords: ''
            }
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.location.address === 'loading') this.setState({ loading: true });

        else {

            const textarea = document.querySelector('#address');

            this.setState({
                location: nextProps.location,
                loading: false
            });

            setTimeout(() => {

                materializeJS.M.textareaAutoResize(textarea);
                if (this.state.initialized) textarea.focus();
                else this.setState({ initialized: true });

            }, 50);
        }
    }

    render() {
        return (
            <StyledLocation>
                <SelectLocationMap />
                <div className="row">
                    <div className="textarea-cont input-field col s12 m10 offset-m1 l8 offset-l2">
                        <textarea
                            value={this.state.location.address} 
                            className="materialize-textarea"
                            id="address" 
                            type="text"
                            disabled={this.state.loading}
                            onChange={(e) => this.setState({ location: { address: e.target.value }})}
                        />
                        <label className="active" htmlFor="address">Location Address</label>
                        <span className="helper-text">
                            {
                                this.state.loading 
                                ? 'Fetching location address...' 
                                : 'Leave empty for no address'
                            }
                        </span>
                    </div>
                </div>
                <NextStage 
                    message={this.props.message} 
                    valid={!this.state.loading} 
                    data={{ location: this.state.location.address === '' ? false : this.state.location}}
                />
            </StyledLocation>
        )
    }
}


const mapStateToProps = state => {
    return { 
        location: state.dashboard.newRoom.location
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);


const StyledLocation = styled.div`
    
    .textarea-cont {
        margin: 4rem auto;
        min-height: 100px;
    }
`;
