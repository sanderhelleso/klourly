import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomRadiusForCheckinAction } from '../../../../actions/room/checkin/updateRoomRadiusForCheckinAction';

class RadiusOptions extends Component {
    constructor(props) {
        super(props);

        this.options = [
            {
                title: '5',
                radius: 5,
            },
            {
                title: '10',
                radius: 10,
            },
            {
                title: '20',
                radius: 20,
            },
            {
                title: 'No Limit',
                radius: false,
            }
        ];
    }

    renderRadiusOptions = () => {
        return this.options.map(option => {
            return (
                <p key={option.title}>
                    <label>
                        <input 
                            className="with-gap"
                            name="group1" 
                            type="radio" 
                            value={option.radius} 
                            checked={this.props.radiusOption === option.radius ? true : false}
                            onChange={(e) => 
                                this.props.updateRoomRadiusForCheckinAction(
                                    e.target.value !== 'false' // 'No Limit' returns boolean as string
                                    ? parseInt(e.target.value)
                                    : false
                                )
                            } 
                        />
                        <span>{option.title}</span>
                    </label>
                </p>
            );
        });
    }

    render() {
        return (
            <StyledOptions className="col s12">
                <h5>Select Radius Limit</h5>
                {this.renderRadiusOptions()}
            </StyledOptions>
        )
    }
}

const mapStateToProps = state => {
    return { radiusOption: state.room.activeRoom.checkin.radius };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateRoomRadiusForCheckinAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RadiusOptions);

const StyledOptions = styled.div`

    margin-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
    text-align: left;
    padding-top: 1.25rem !important;
    padding-left: 1.75rem !important;

    @media screen and (max-width: 1000px) {
        text-align: center;
    }

    @media screen and (max-width: 420px) {
        text-align: left;
    }

    h5 {
        color: #9e9e9e;
        font-size: 1.5rem;
        opacity: 0.7;
    }

    p {
        display: inline-block;
        margin: 1rem  1.5rem 0 0 !important;

        @media screen and (max-width: 420px) {
            display: block;
        }
    }
`;
