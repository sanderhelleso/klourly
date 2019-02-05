import React, { Component } from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetNewRoomProgressAction } from '../../actions/newRoom/resetNewRoomProgressAction';

import NextStage from './NextStage';
import CircularLoader from '../loaders/CircularLoader';
import { notification } from '../../helpers/notification';

class Intro extends Component {
    constructor(props) {
        super(props);

        this.lastStage = 6;
        this.state = { iconLoaded: false, next: false }
    }

    componentWillReceiveProps(nextProps) {


        if (this.props.stage.icon !== nextProps.stage.icon) {
            this.setState({ iconLoaded: false });

            setTimeout(() => { 
                this.setState({ next: this.props.currentStage === 0 ? false : true }
            )}, 100);
        }
    }

    mainIntro() {
        return(
            <div className="row animated fadeIn">
                <div id="new-room-intro" className="center col s12">
                    {this.renderCancel()}
                    <h1>{this.props.stage.heading}</h1>
                    <p>{this.props.stage.intro}</p>
                    {this.renderImage()}
                </div>
            </div>
        )
    }

    renderCancel() {

        if (this.props.currentStage > 0 && this.props.currentStage < 7) {
           return (
                <StyledCancel
                    className="waves-effect waves-light btn animated fadeInDown"
                    onClick={() => {
                        this.props.resetNewRoomProgressAction();
                        notification.success('New Room progress has been reset!')
                    }}
                >
                    Reset Progress
                </StyledCancel>
           )
        }

        return null;
    }

    renderImage() {

        if (this.props.stage.icon) {
            return (
                <div className="icon-cont">
                    <img 
                        src={this.props.stage.icon} 
                        alt="Stage Icon" 
                        onLoad={() => this.setState({ iconLoaded: true })}
                        className={`stage-icon ${this.state.iconLoaded 
                                    ? 'icon-loaded' : 'icon-loading'}`} 
                    />
                </div>
            )
        }

        else return (
            <div id="loader-cont">
                <CircularLoader size="big" />
            </div>
        )
    }

    /*subIntro() {
        return (
            <div className="row">
                <div id="new-room-intro-sub" className="center col s10 offset-s1 animated fadeIn">
                    <div className="col s6">
                        <h5>
                            <span className="step">Step</span>
                            {this.props.currentStage}
                            <span>/</span>
                            {this.lastStage}
                        </h5>
                    </div>
                    <div className="col s6">
                        <h4>{introTxt.heading}</h4>
                    </div>
                </div>
            </div>
        )
    }
*/  
    renderNext() {

        if (this.state.next) return null;

        // set default data
        return (
            <NextStage
                message={this.props.stage.buttonTxt}
                valid={true} 
                data={{ owner: this.props.userID,
                        cover: false,
                        times: false
                    }}
            />
        )
    }

    render() {
        return (
            <StyledIntro createStage={this.props.stage.icon}>
                {this.mainIntro()}
                {this.renderNext()}
            </StyledIntro>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        currentStage: state.dashboard.newRoom.stage
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ resetNewRoomProgressAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);


const StyledIntro = styled.div`
    margin-top: ${props => !props.createStage ? 22.5 : 7.5}vh;
    position: relative;

    #loader-cont {
        position: relative;
        margin-top: 6.5rem;
    }

    .stage-icon {
        transition: 0.3s ease-in-out;
        max-width: 330px;
        max-height: 330px;
    }

    .icon-cont {
        min-height: 256px;
        max-height: 256px;
    }

    .icon-loading {
        opacity: 0;
    }

    .icon-loaded {
        opacity: 1;
    }

    #new-room-intro h1 {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 2rem;
        letter-spacing: 2px;
        text-transform: capitalize;
    }

    #new-room-intro-sub {
        margin-top: -5rem;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
    }

    #new-room-intro-sub h4 {
        font-weight: 800;
        font-size: 2rem;
        max-width: 15rem;
        float: right;
        letter-spacing: 2px;
        margin-top: 5rem;
        text-transform: capitalize;
    }

    #new-room-intro-sub h5 {
        float: left;
        color: #bdbdbd;
        font-weight: 100;
        font-size: 5rem;
        opacity: 0.8;

        span {
            font-size: 3rem;
            opacity: 0.5;
            font-weight: 100;
            padding: 0 0.25rem;
        }
    }

    #new-room-intro p {
        max-width: 550px;
        margin: 1rem auto;
        color: #9e9e9e;
    }

    @media screen and (max-width: 600px) {
        #new-room-intro h1 {
            font-size: 2rem;
        }

        .stage-icon {
            max-width: 200px;
            max-height: 200px;
        }

        .icon-cont {
            min-height: 200px;
            max-height: 200px;
        }

        #new-room-intro p {
            font-size: 0.9rem;
            color: #9e9e9e;
        }
    }
`;

const StyledCancel = styled.a`
    color: #ffffff;
    background-color: #bdbdbd;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    line-height: 0;
    letter-spacing: 2px;
    font-size: 1rem;
    font-weight: 600;
    padding: 1.75rem;
    color: #757575;
    position: absolute;
    right: 0;
    top: -155px;

    &:hover {
        background-color: #bdbdbd;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    }
`;