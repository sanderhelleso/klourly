import React, { Component } from 'react';
import styled from 'styled-components';
import { Info } from 'react-feather';
import { materializeJS } from '../../../helpers/materialize';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ConfirmPurposeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attendence: 95,
            chargeAmount: ''
        }
    }

    componentWillReceiveProps() {
        materializeJS.M.updateTextFields();
        this.setState({ attendence: 95 });
        document.querySelector('input').focus();
    }

    componentDidMount() {

        // prepeare modal
        const modal = document.querySelectorAll('.modal');
        materializeJS.M.Modal.init(modal, {
            endingTop: '10%'
        });
    }

    renderAttendenceRequirement() {

        return(
            <div className="col s12">
                <div className="input-field">
                    <input 
                        id="attendece" 
                        type="number"
                        name="attendence"
                        placeholder="95"
                        value={this.state.attendence}
                        onChange={(e) => {
                            console.log(e.target.value.length)
                            if (e.target.value.length < 4) {
                                if (e.target.value > 100) e.target.value = 100;
                                this.setState({ attendence: e.target.value })
                            }
                        }}
                    />
                    <label for="attendence">Minimum attendence requirement in %</label>
                    <span class="helper-text">Leave field empty for no requirement</span>
                </div>
            </div>
        )
    }

    renderChargeAmount() {

        if (this.props.data.title === 'Business') {
            return(
                <div className="col s12">
                    <Info size={50} />
                    <p>Business rooms allows you to set a charge amount. This is usefull if you are delivering services with fees per attendence (job, allowance, scholarship). Once a charge amount is sat, reports generated in the future will include the details and total sum</p>
                    <div className="input-field">
                        <input 
                            id="charge-amount" 
                            type="number"
                            name="charge-amount"
                            value={this.state.chargeAmount}
                            placeholder="50.00"
                            onChange={(e) => {                           
                                this.setState({ chargeAmount: e.target.value })
                            }}
                        />
                        <label for="charge-amount" className="active">Charge amount per attendence ($ dollar)</label>
                        <span class="helper-text">Leave field empty for no charge amount</span>
                    </div>
                </div>
            )
        }

       return null;
    }

    render() {
        return (
            <StyledModal id="confirm-room-purpose-modal" className="modal">
                <StyledModalContent className="modal-content">
                    <h4>{this.props.data.title}</h4>
                    <p>Great! You selected <span>{this.props.data.title}</span> as your room type. Specify the requirements for the room below if needed.</p>
                    <div className="row inputs">
                        {this.renderAttendenceRequirement()}
                        {this.renderChargeAmount()}
                    </div>
                </StyledModalContent>
            </StyledModal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(ConfirmPurposeModal);


const StyledModal = styled.div`
    width: 500px;
    padding: 1rem 2rem;

    @media (max-width: 450px) {
        width: 90%;
    }

    @media (max-width: 380px) {
        padding: 1rem;
    }
`;

const StyledModalContent = styled.div`
    position: relative;
    text-align: center;

    h4 {
        max-width: 180px;
        margin: 2rem auto;
        font-size: 1.75rem;
        font-weight: 800;
    }

    p {
        color: #9e9e9e;
        font-size: 0.9rem;

        span {
            text-transform: lowercase;
        }
    }

    .inputs {
        padding-top: 2rem;
        margin-top: 2rem;

        p {
            margin: 0 0 4rem 0;
            text-align: left;
        }

        svg {
            margin: 4rem auto 2rem auto;
            stroke: #e0e0e0;
        }
    }

    .input-field label {
        pointer-events: none;
    }

    .helper-text {
        text-align: left;
    }
`;