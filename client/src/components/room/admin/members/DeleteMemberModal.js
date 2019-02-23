import React, { Component } from 'react';
import { AlertOctagon } from 'react-feather';
import styled from 'styled-components';
import { materializeJS } from '../../../../helpers/materialize';
import { notification } from '../../../../helpers/notification';
import { room } from '../../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomMembersAction } from '../../../../actions/room/updateRoomMembersAction';

import LinearLoader from '../../../loaders/LinearLoader';

class DeleteMemberModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    componentDidMount() {

        // prepare modal
        const modal = document.querySelector('#confirm-delete-member-modal');
        materializeJS.M.Modal.init(modal, { endingTop: '25%' });
    }

    deleteUser = async () => {

        // set loading state to disable button
        this.setState({
            loading: true
        });
        
        // attempt to delete user
        const response = await room.removeRoomMember(this.props.data.id, this.props.roomID);

        // enable button
        this.setState({
            loading: false
        });

        // if successfull, update members and close modal
        if (response.data.success) {
            this.props.updateRoomMembersAction(response.data.updatedMembersList);
            document.querySelector('.modal-close').click();

            // display notification
            notification.success(response.data.message);
        }
    }

    renderFooter() {
        if (!this.state.loading) {
            return (
                <div>
                    <CancelButton 
                        className="modal-close waves-effect waves-purple btn-flat"
                    >
                        Cancel
                    </CancelButton>
                    <ConfirmButton 
                        className="waves-effect waves-red btn-flat"
                        onClick={this.deleteUser}
                    >
                        Confirm
                    </ConfirmButton>
                </div>
            )
        }

        return <LinearLoader center={false} loading={this.state.loading} />

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
                    {this.renderFooter()}
                </ModalFooter>
            </StyledModal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateRoomMembersAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(DeleteMemberModal);


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
    min-height: 55px;

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
