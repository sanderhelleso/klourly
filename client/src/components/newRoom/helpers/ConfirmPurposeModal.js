import React, { Component } from 'react';
import styled from 'styled-components';
import { materializeJS } from '../../../helpers/materialize';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ConfirmPurposeModal extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    componentDidMount() {

        // prepeare modal
        const modal = document.querySelectorAll('.modal');
        materializeJS.M.Modal.init(modal, {
            endingTop: '25%'
        });
    }

    render() {
        return (
            <StyledModal id="confirm-room-purpose-modal" className="modal">
                <StyledModalContent className="modal-content">
                    <p>SUP</p>
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
    overflow-y: visible;
    width: 425px;
    padding: 1rem 2rem;

    @media (max-width: 450px) {
        width: 90%;
    }

    @media (max-width: 380px) {
        padding: 1rem;
    }

    @media (max-height: 500px) AND (max-width: 400px) {
        overflow-y: auto;

        img {
            top: 20px;
        }

        .modal-content h4 {
            margin-top: 120px;
        }
    }
`;

const StyledModalContent = styled.div`
    position: relative;
    text-align: center;

    h4 {
        margin: 2rem 0;
        font-size: 1.75rem;
    }

    p {
        color: #9e9e9e;
        font-size: 0.9rem;
    }
`;