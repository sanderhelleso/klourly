import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../actions/newRoom/nextStageAction';

class NextStage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.message,
            valid: this.props.valid,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn new-room-name-disabled',
            id: 'confirm-new-room-name'
        }

        this.renderNext = this.renderNext.bind(this);
        this.setNextStage = this.setNextStage.bind(this);
        this.nextStageOnEnterKey = this.nextStageOnEnterKey.bind(this);
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

    nextStageOnEnterKey(e) {
        if (e.keyCode === 13) {
            document.querySelector(`#${this.state.id}`).click();
        }
    }

    renderNext() {
        if (this.state.valid) {
            return(
                <button 
                id={this.state.id} 
                className={this.state.classNameEnabled} 
                onClick={this.setNextStage}
                >
                {this.state.message}
                </button>
            )
        }

        return(
            <button 
                id={this.state.id} 
                className={this.state.classNameDisabled}
            >
                {this.state.message}
            </button>
        )
    }

    setNextStage() {
        this.props.nextStageAction({
            stage: this.props.state.dashboard.newRoom.stage + 1,
            ...this.props.data
        });
    }

    render() {
        return (
            <div>
                {this.renderNext()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NextStage);
