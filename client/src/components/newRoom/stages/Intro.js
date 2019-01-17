import React, { Component } from 'react';
import styled from 'styled-components';
import NextStage from '../NextStage';
import { connect } from 'react-redux';

const introTxt = {
    heading: 'Lets create a New Room',
    intro: 'A room allow you to keep full controll on whats happening. Who is present, when do people show up, who is the least active and much more.'
}

class Intro extends Component {
    constructor(props) {
        super(props);

        this.lastStage = 7;
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
                </div>
            </div>
        )
    }

    subIntro() {
        return (
            <div className="row">
                <div id="new-room-intro-sub" className="center col s8 offset-s2 animated fadeIn">
                    <h4>{introTxt.heading}</h4>
                    <h5>{`Step ${this.props.currentStage} / ${this.lastStage}`}</h5>
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
        text-transform: capitalize;
    }

    #new-room-intro-sub h5 {
        float: left;
        margin-top: 3.5rem;
        color: #9e9e9e;
        font-weight: 300;
        font-size: 1.5rem;
    }

    #new-room-intro p {
        max-width: 520px;
        margin: 0 auto;
        color: #9e9e9e;
    }
`;