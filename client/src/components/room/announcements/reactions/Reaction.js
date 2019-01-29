import React, { Component } from 'react';
import { room } from '../../../../api/room/room';

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
            this.props.id,
            this.props.name
        );

        this.setState({ reacted: this.state.reacted ? false : true });

        // enable mouse event
        ele.style.cursorEvent = 'default';
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
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reactions);
