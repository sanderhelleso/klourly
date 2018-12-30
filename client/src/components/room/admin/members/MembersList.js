import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { room } from '../../../../api/room/room';
import Member from './Member';

class MembersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.membersList !== nextProps.membersList) {
            this.setState({
                membersList: this.state.membersList.filter(
                             member => nextProps.membersList
                             .indexOf(member.id) !== -1)
            });
        }
    }

    async componentDidMount() {

        // check if member list is empty
        console.log(this.props.membersList);
        if (this.props.membersList) {

            // attempt to fetch rooms members
            const response = await room.getRoomMembers(
                this.props.user.id, 
                this.props.roomID, 
                this.props.membersList
            );

            this.setState({
                loading: false,
                membersList: response.data.membersList 
                            ? response.data.membersList.sort(
                            (a, b) => `${a.name}`
                            .localeCompare(`${b.name}`)) 
                            : [] // sort list (A - Z)
            });
        }
    }

    renderMembers() {
        if (!this.state.loading) {
            return this.state.membersList.map(member => {
                return <Member key={member.id} data={member} />
            });
        }

        return null; //<LinearLoader loading={this.state.loading} />;
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

// set initial store state
const mapStateToProps = state => {
    return { 
        user: state.auth.user,
        roomID: state.room.activeRoom.id,
        membersList: state.room.activeRoom.members
     }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);

const StyledMembersList = styled.div`
    margin-top: 4rem;
    padding: 4rem 0;
    border-top: 1px solid #eeeeee;
`;