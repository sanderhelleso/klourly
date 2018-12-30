import React, { Component } from 'react';
import { AlertOctagon } from 'react-feather';
import styled from 'styled-components';
import { materializeJS } from '../../../../helpers/materialize';
import { room } from '../../../../api/room/room';

export default class DeleteMemberModal extends Component {
    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {

        // prepeare modal
        const modal = document.querySelectorAll('.modal');
        materializeJS.M.Modal.init(modal, {
            endingTop: '25%'
        });
    }

    async deleteUser() {
        
        const response = await room.removeRoomMember(this.props.data.id, this.props.roomID);

        console.log(response);

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
                    <AlertOctagon size={30} />
                    <p>{`Are you sure you want to remove ${this.props.data.name} 
                        from this room? Removal will delete all records and statistics
                        available for the user. This action is not reversable and 
                        ${this.props.data.name} will need a new invitation to join the room again`}
                    </p>
                </StyledModalContent>
                <ModalFooter>
                    <CancelButton className="modal-close waves-effect waves-purple btn-flat">Cancel</CancelButton>
                    <ConfirmButton 
                        className="waves-effect waves-red btn-flat"
                        onClick={this.deleteUser}
                    >
                        Confirm
                    </ConfirmButton>
                </ModalFooter>
            </StyledModal>
        )
    }
}

const StyledModal = styled.div`
    overflow-y: visible;
    max-width: 30%;
    padding: 1rem 2rem;
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

    svg {
        stroke: #ff5252;
        margin-bottom: 0.5rem;
        opacity: 0.8;
    }
`;

const MemberImage = styled.img`
    position: absolute;
    top: -70px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    min-height: 100px;
    min-width: 100px;
    max-height: 100px;
    max-width: 100px;
`;

const ModalFooter = styled.div`
    padding-top: 1rem;
    border-top: 1px solid #eeeeee;
    text-align: center;
    margin: 0 auto;

    button {
        margin: 1rem;
        min-width: 125px;
        font-size: 0.9rem;
        font-weight: 600;
        line-height: 30px;
    }
`;

const CancelButton = styled.button`
    border: 1.5px solid #bdbdbd;
    cursor: pointer;
    color: #bdbdbd;
    border-radius: 4px;
    background-color: transparent;
`;

const ConfirmButton = styled.button`
    border: 1.5px solid #ff5252;
    cursor: pointer;
    color: #ff5252;
    border-radius: 4px;
    background-color: transparent;
`;
