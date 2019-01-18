import React, { Component } from 'react';
import styled from 'styled-components';
import NextStage from './NextStage';
import { connect } from 'react-redux';

const introTxt = {
    heading: 'Lets create a New Room',
    intro: 'A room allow you to keep full controll on whats happening. Who is present, when do people show up, who is the least active and much more.'
}

class Intro extends Component {
    constructor(props) {
        super(props);

        this.icon = `https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fstage-${this.props.currentStage}-256.png?alt=media&token=bbb7bfc7-050b-46f3-8cbf-edcc11f50d57`;
        this.lastStage = 6;
        this.message = 'Create New Room';
    }

    renderIntro() {       
        
        if (this.props.currentStage === 0) {
            return this.mainIntro();
        }

        else if (this.props.currentStage > 0 && this.props.currentStage < 8) {
            return this.subIntro()
        }

        else return null;
    }

    mainIntro() {
        return(
            <div className="row animated fadeIn">
                <div id="new-room-intro" className="center col s8 offset-s2">
                    <h1>{introTxt.heading}</h1>
                    <p>{introTxt.intro}</p>
                    <img className="stage-icon" src={this.icon} alt="Stage Icon" />
                </div>
            </div>
        )
    }

    subIntro() {
        return (
            <div className="row">
                <div id="new-room-intro-sub" className="center col s8 offset-s2 animated fadeIn">
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


    render() {
        return (
            <StyledIntro>
                {this.renderIntro()}
                {this.props.currentStage === 0
                    ? <NextStage
                        message={this.message}
                        valid={true} 
                        data={{ owner: this.props.userID }}
                    />
                    :null
                }
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

export default connect(mapStateToProps, null)(Intro);


const StyledIntro = styled.div`

    #new-room-intro h1 {
        font-size: 3.2rem;
        font-weight: 800;
        margin-bottom: 2rem;
        letter-spacing: 2px;
        text-transform: capitalize;
    }

    #new-room-intro-sub {
        margin-top: -5rem;
        margin-bottom: 3rem;
        border-bottom: 1px solid #dadada;
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

        .step {
            margin-bottom: -25px;
            padding-left: 10px;
            letter-spacing: 4px;
            font-size: 1.75rem;
            text-transform: uppercase;
            display: block;
            opacity: 0.8;
        }
    }

    #new-room-intro p {
        max-width: 520px;
        margin: 0 auto;
        color: #9e9e9e;
    }
`;