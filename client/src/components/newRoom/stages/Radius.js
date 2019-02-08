import React, { Component } from 'react';
import styled from 'styled-components';
import { Compass, Globe, Lock, Home } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../actions/newRoom/nextStageAction';


class Radius extends Component {
    constructor(props) {
        super(props);

        this.options = [
            {
                title: '30',
                radius: 30,
                icon: <Lock size={25} />,
                meter: 'Meter'
            },
            {
                title: '60',
                radius: 60,
                icon: <Compass size={25} />,
                meter: 'Meter'
            },
            {
                title: '120',
                radius: 120,
                icon: <Globe size={25} />,
                meter: 'Meter'
            },
            {
                title: 'No Limit',
                radius: false,
                icon: <Home size={25} />,
                noLimit: true
            }
        ]
    }

    selectOption(radius) {
        
        // animate cards
        const cont = document.querySelector('.room-options-cont');
        const options = Array.from(cont.querySelectorAll('.room-option'));
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            option.classList.remove("fadeIn");
        });

        options.forEach(option => option.classList.add('fadeOut'));

        setTimeout(() => {

            // update state
            this.props.nextStageAction({
                stage: this.props.currentStage + 1,
                radius: radius
            });
        }, 100);
    }

    renderRadiusOptions = () => {
        return this.options.map(option => {
            return (
                <div key={option.radius} className="col s12 m6 l3">
                    <StyledOption
                        tabIndex={0}
                        className={`animated fadeIn room-option no-select option-${this.options.indexOf(option) + 1}`}
                        onClick={() => this.selectOption(option.radius)}
                    >
                        {option.icon}
                        <h5 className={`${option.noLimit ? 'no-limit' : ''}`}>
                            {option.title}
                        </h5>
                        <span>{option.meter}</span>
                    </StyledOption>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="col s12 room-options-cont">
                {this.renderRadiusOptions()}
                <div className="col s12">
                    <StyledInfo>You can change these settings whenever you want</StyledInfo>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { 
        currentStage: state.dashboard.newRoom.stage
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Radius);

const StyledInfo = styled.p`
    font-size: 0.9rem;
    color: #9e9e9e;
    opacity: 0.8;
    margin-top: 5rem;
    text-align: center;
`;

const StyledOption = styled.div`
    padding: 2rem 1rem;
    text-align: center;
    box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.25);
    border-radius: 18px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    min-height: 250px;
    max-height: 250px;
    margin: 0.25rem;

    span {
        color: #ffffff;
    }

    h5 {
        color: #ffffff;
        opacity: 0.8;
        letter-spacing: 4px;
        line-height: 30px;
        font-size: 3.5rem;
        margin: 1.5rem 0;
    }

    .no-limit {
        font-size: 2rem;
        line-height: 35px;
        margin: 2rem 0;
    }

    svg {
        transition: 0.3s ease-in-out;
        stroke: #ffffff;
        pointer-events: none;
        margin-top: 2rem;
    }

    &:hover, &:active, &:focus {
        box-shadow: 0px 36px 72px rgba(0, 0, 0, 0.25);
    }

    &.option-1 {
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(-220deg, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(-220deg, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    &.option-2 {
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(30deg, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(30deg, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    &.option-3 {
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(220deg, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(220deg, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    &.option-4 {
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(-30deg, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(-30deg, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    @media screen and (max-width: 1000px) {
        margin-bottom: 2rem;
    }
`;