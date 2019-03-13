import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { room } from '../../../../api/room/room';
import { notification } from '../../../../helpers/notification';
import Member from './Member';
import CircularLoader from '../../../loaders/CircularLoader';
import NoMembersPlaceholder from '../../placeholders/NoMembersPlaceholder';
import { updateRoomMembersAction } from '../../../../actions/room/updateRoomMembersAction';

class MembersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
        }
    }

    async componentDidMount() {


        // check if member list is empty
        if (this.props.membersList && this.props.membersList.length > 0) {

            // attempt to fetch rooms members
            const response = await room.getRoomMembers(
                this.props.userID, 
                this.props.roomID, 
                this.props.membersList
            );

            // set members
            if (response.data.success) {
                this.setState({
                    loading: false,
                    error: false,
                });

                this.props.updateRoomMembersAction(
                    response.data.membersList 
                    ? response.data.membersList.sort(
                        (a, b) => `${a.name}`.localeCompare(`${b.name}`)) 
                    : [] // sort list (A - Z)
                );
            }

            // notify user about members
            else {
                this.setState({ error: true });
                notification.error('Unable to retrieve members at this time');
            }
        }

        else this.setState({ loading: false });
    }

    renderMembers() {
        if (!this.state.loading && this.props.membersList && this.props.membersList.length > 0) {
            return this.props.membersList.map(member => {
                return <Member key={member.id} data={member} />
            });
        }

        else if (this.state.error) return <p>Unable to retrieve members at this time</p>;

        else if (this.state.loading) return <CircularLoader size="medium" />;

        return <NoMembersPlaceholder text="invite" includeLink={false} />;

    }

    render() {
        return (
            <StyledMembersList>
                <div className="row">
                    {this.renderMembers()}
                </div>
            </StyledMembersList>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        membersList: state.room.activeRoom.members
     }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateRoomMembersAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);

const StyledMembersList = styled.div`
    margin-top: 4rem;
    padding: 4rem 0;
    border-top: 1px solid #e0e0e0;
    position: relative;

    .circular-loader {
        top: 80%;
    }
`;