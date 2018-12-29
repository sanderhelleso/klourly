import React, { Component } from 'react';
import styled from 'styled-components';
import { materializeJS } from '../../../../helpers/materialize';

export default class DeleteMemberModal extends Component {
    constructor(props) {
        super(props);
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
            <StyledModal id="confirm-delete-member-modal" className="modal">
                <StyledModalContent className="modal-content">
                    <MemberImage 
                        src={this.props.data.photoUrl} 
                        alt={`${this.props.data.name}'s avatar`} 
                    />
                    <h4>Confirm Remove Member</h4>
                    <p>{`Are you sure you want to remove ${this.props.data.name} 
                        from this room? Removal will delete all records and statistics
                        available for the user. This action is not reversable and 
                        ${this.props.data.name} will need a new invitation to join the room again`}
                    </p>
                </StyledModalContent>
            </StyledModal>
        )
    }
}

const StyledModal = styled.div`
    overflow-y: visible;
    max-width: 30%;
    padding: 2rem;
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

const MemberImage = styled.img`
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    min-height: 100px;
    min-width: 100px;
    max-height: 100px;
    max-width: 100px;
`;
