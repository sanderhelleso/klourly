import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Activate extends Component {
    constructor(props) {
        super(props);
    }

    async getCurrentLocation() {
    }

    render() {
        return (
            <div>
                <StyledActivate 
                    className="waves-effect waves-light"
                    onClick={this.getCurrentLocation}
                >
                    Activate
                </StyledActivate>
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate);


const StyledActivate = styled.button`
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #ffffff;
    box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.09);
    line-height: 0;
    border: none;
    padding: 1.75rem 0;
    min-width: 200px;
    letter-spacing: 2px;
    font-size: 1rem;
    text-align: center;
    margin: 2rem auto;
    transition: 0.3s ease-in-out;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 8px;
`;
