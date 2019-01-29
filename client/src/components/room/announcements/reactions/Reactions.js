import React, { Component } from 'react';
import styled from 'styled-components';
import Reaction from './Reaction';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Reactions extends Component {
    constructor(props) {
        super(props);
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

    renderReactions() {

        return Object.entries(this.props.reactions).map(([key, value]) => {
            return (
                <Reaction 
                    key={key}
                    id={this.props.id}
                    name={key}
                    data={value}
                />
            );
        });
    }


    render() {
        return (
            <StyledReactions className="col s12 m12 l10">
                {this.renderReactions()}
            </StyledReactions>
        )
    }
}

const mapStateToProps = (state, compProps) => {
    return {
        reactions: state.room.activeRoom.announcements[compProps.id].reactions
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reactions);


const StyledReactions = styled.div`

    text-align: center;
    margin-top: 0.5rem;
    padding: 0 !important;

    div {
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        margin: 0 0.5rem;
        padding: 0.5rem !important;
        cursor: pointer;
        transition: 0.2s ease-in-out;
    }

    div span {
        font-size: 1rem;
        z-index: -1000;
        pointer-events: none;
        color: #363636;
    }

    .reacted {
        background-color: #ede7f6 !important;
        border: 1px solid #d1c4e9 !important;
    }
`;
