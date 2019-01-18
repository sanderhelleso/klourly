import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../actions/newRoom/nextStageAction';

class NextStage extends Component {
    constructor(props) {
        super(props);

        this.state = { valid: this.props.valid }
    }

    // lifecycle, add event on mount
    componentDidMount() {
        document.addEventListener('keyup', this.nextStageOnEnterKey);
    }

    // remove event on unmount
    componentWillUnmount() {
        document.removeEventListener('keyup', this.nextStageOnEnterKey);
    }

    // update disabled / enabled state depending on props recieved
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                valid: nextProps.valid
            });
        }
    }

    nextStageOnEnterKey = e => {
        if (e.keyCode === 13) document.querySelector('#next-stage').click();
    }

    setNextStage = () => {
        this.props.nextStageAction({
            stage: this.props.currentStage + 1,
            ...this.props.data
        });
    }

    render() {
        return (
            <StyledButton
                id="next-stage"
                className="waves-effect waves-light btn animated fadeIn"
                disabled={!this.state.valid} 
                onClick={() => this.state.valid ? this.setNextStage() : {}}
            >
                {this.props.message}
            </StyledButton>
        )
    }
}

const mapStateToProps = state => {
    return { currentStage: state.dashboard.newRoom.stage };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NextStage);

const StyledButton = styled.a`
    box-shadow: none;
    color: #ffffff;
    background-color: #12e2a3;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    line-height: 0;
    letter-spacing: 2px;
    font-size: 1rem;
    font-weight: 600;
    padding: 1.75rem;
    display: block;
    max-width: 320px;
    margin: 2rem auto 0 auto;
    clear: both;

    &:hover {
        box-shadow: 0px 18px 56px rgba(0,0,0,0.15);
        background-color: #12e2a3;
    }
`;