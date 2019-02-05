import React, { Component } from 'react';
import { StyledButtonMain } from '../styles/buttons';

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
    componentDidMount = () => document.addEventListener('keyup', this.nextStageOnEnterKey);

    // remove event on unmount
    componentWillUnmount = () => document.removeEventListener('keyup', this.nextStageOnEnterKey);

    // update disabled / enabled state depending on props recieved
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) this.setState({  valid: nextProps.valid  });
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
            <StyledButtonMain
                id="next-stage"
                className="waves-effect waves-light btn animated fadeIn"
                disabled={!this.state.valid} 
                onClick={() => this.state.valid ? this.setNextStage() : {}}
            >
                {this.props.message}
            </StyledButtonMain>
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