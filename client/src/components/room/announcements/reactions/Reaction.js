import React, { Component } from 'react';
import { room } from '../../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Reactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.data,
            reacted: false
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

    async updateReaction() {
        if (!this.state.reacted) {
            this.setState({
                count: this.state.count + 1,
                reacted: true
            });
        }

        else {
            this.setState({
                count: this.state.count - 1,
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

        //console.log(response);
    }

    render() {
        return (
            <div 
            className={this.state.reacted ? "col s2 no-select reacted animated flipInX" : "col s2 no-select animated flipInY"}
            onClick={(event) => this.updateReaction(event)}
            onMouseEnter={(event) => this.hoverReaction(event)}
            onMouseLeave={(event) => this.removeHoverReaction(event)}
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reactions);
