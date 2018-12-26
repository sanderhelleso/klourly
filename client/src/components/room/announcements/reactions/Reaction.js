import React, { Component } from 'react';
import { room } from '../../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateAnnouncementReactionAction } from '../../../../actions/room/updateAnnouncementReactionAction';

class Reactions extends Component {
    constructor(props) {
        super(props);

        
        let reacted = false;
        if (props.data.reacted) {
            reacted = props.data.reacted.indexOf(props.state.auth.user.id) === -1 ? false : true;
        }

        this.state = {
            ...props.data,
            reacted: reacted
        }

        this.updateReaction = this.updateReaction.bind(this);
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

    async updateReaction(e) {

        // disable mouse event to avoid spam
        const ele = e.target;
        ele.style.cursorEvent = 'none';


        if (!this.state.reacted) {
            this.setState({
                count: this.state.count += 1,
                reacted: true
            });
        }

        else {
            this.setState({
                count: this.state.count -= 1,
                reacted: false
            });
        }

        // attempt to update selected emoji
        const response = await room.updateAnnouncementReaction(
            this.props.state.auth.user.id,
            this.props.state.room.activeRoom.id,
            this.props.id,
            this.props.name
        );

        // update announcement reaction
        this.props.updateAnnouncementReactionAction({
            id: this.props.id,
            name: this.props.name,
            updatedReaction: response.data.updated
        });

        // enable mouse event
        ele.style.cursorEvent = 'default';
    }

    render() {
        return (
            <div 
            className={this.state.reacted ? "col s2 no-select reacted animated flipInX" : "col s2 no-select animated flipInY"}
            onClick={(e) => this.updateReaction(e)}
            onMouseEnter={(e) => this.hoverReaction(e)}
            onMouseLeave={(e) => this.removeHoverReaction(e)}
            >
                <span>
                {`${this.state.emoji} ${this.state.count}`}
                </span>
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateAnnouncementReactionAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reactions);
