import React, { Component } from 'react';
import { room } from '../../../../api/room/room';
import { token } from '../../../../api/messaging/token';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Reactions extends Component {
    constructor(props) {
        super(props);

        
        let reacted = false;
        if (props.data.reacted) {
            reacted = props.data.reacted.indexOf(this.props.userID) === -1 ? false : true;
        }

        this.state = { reacted };
    }

    getRGB() {
        return (
            `rgba(
            ${Math.floor(Math.random() * 255) + 1},
            ${Math.floor(Math.random() * 255) + 1},
            ${Math.floor(Math.random() * 255) + 1},
            0.5)`
        );
    }

    hoverReaction(e) {
        e.target.style.backgroundColor = this.getRGB();
    }

    removeHoverReaction(e) {
        e.target.style.backgroundColor = 'transparent';
    }

    updateReaction = async e => {

        // disable mouse event to avoid spam
        const ele = e.target;
        ele.style.cursorEvent = 'none';

        // attempt to update selected emoji
        await room.updateAnnouncementReaction(
            this.props.userID,
            this.props.roomID,
            this.props.id, // announcement ID
            this.props.name
        );

        this.setState({ reacted: this.state.reacted ? false : true });

        // enable mouse event
        ele.style.cursorEvent = 'default';

        // send push notifications to announcement owner (room owner)
        if (this.state.reacted && this.props.userID !== this.props.ownerID) {

            const notificationData = {
                title: `New announcement reaction ${this.props.data.emoji}`,
                body: `"${this.props.displayName}" reacted to your annoucement!`,
                icon: this.props.photoUrl,
                click_action: `http://localhost:3000/dashboard/rooms/${this.props.roomID}/announcements/${this.props.id}`
            };
    
            token.getRoomMembersToken(
                this.props.userID, 
                this.props.roomMembers, 
                notificationData
            );
        }
    }

    render() {
        return (
            <div 
                className={
                    this.state.reacted 
                    ? "col s3 m2 l2 no-select reacted animated flipInX" 
                    : "col s3 m2 l2 no-select animated flipInY"
                }
                onClick={(e) => this.updateReaction(e)}
                onMouseEnter={(e) => this.hoverReaction(e)}
                onMouseLeave={(e) => this.removeHoverReaction(e)}
            >
                <span>
                {`${this.props.data.emoji} ${this.props.data.count}`}
                </span>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { 
        displayName: state.dashboard.userData.settings.displayName,
        photoUrl: state.dashboard.userData.settings.photoUrl,
        roomMembers: state.room.activeRoom.members,
        userID: state.auth.user.id,
        ownerID: state.room.activeRoom.owner,
        roomID: state.room.activeRoom.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reactions);
