import React, { Component } from 'react';
import { materializeJS } from '../../helpers/materialize';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // prepare modal
        const modal = document.querySelectorAll('#forgot-password-modal');
        materializeJS.M.Modal.init(modal, { endingTop: '15%' });
    }

    render() {
        return (
            <StyledModal id="forgot-password-modal" className="modal modal-fixed-footer">
                <StyledModalContent className="modal-content">
                    <h4>Forgot your password?</h4>
                    <p>Please enter your e-mail address connected to your account. We will send you instructions on how to reset your password</p>
                </StyledModalContent>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-light btn-flat">Cancel</a>
                </div>
            </StyledModal>
        )
    }
}

const StyledModalContent = styled.div`
    position: relative;
    text-align: center;
    padding: 1rem 4rem;

    h4 {
        max-width: 180px;
        margin: 2rem auto;
        font-size: 1.75rem;
        font-weight: 800;
    }
`;
