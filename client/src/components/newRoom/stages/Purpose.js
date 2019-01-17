import React, { Component } from 'react';
import styled from 'styled-components';
import { Headphones, PieChart, } from 'react-feather';
import { helpers } from '../helpers/helpers';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../actions/newRoom/nextStageAction';


class Purpose extends Component {
    constructor(props) {
        super(props);

        this.purposeOptions = {
            arrangement: {
                className: 'animated fadeIn no-select',
                icon: <Headphones size={35} />,
                title: 'Arrangement'
            },
            education: {
                className: 'animated fadeIn no-select',
                icon: <PieChart size={35} />,
                title: 'Education'
            },
            consultant: {
                className: 'animated fadeIn no-select',
                icon: <PieChart size={35} />,
                title: 'Business'
            }
        }
    }

    renderCards = () => {

        let i = 0;
        return Object.values(this.purposeOptions).map(option => {
            i++;
            return (
                <div className="col s4">
                    <StyledCard 
                        purpose={option.title.toLowerCase()}
                        even={i % 2 === 0}
                        tabIndex={0}
                        className={option.className} 
                        onClick={(e) => helpers.selectOption(e, {purpose: option.title}, this.props)}
                    >
                        <div className="cover-cont">
                    </div>
                        <div className="info-cont">
                            {option.icon}
                            <h5>{option.title}</h5>
                        </div>
                    </StyledCard>
                </div>
            )
        });
    }

    render() {
        return (
            <div id="room-option-cont" className="col s12">
                {this.renderCards()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Purpose);

const StyledCard = styled.div`

    margin: 1rem;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;
    transition: 0.3s ease-in-out;
    border-radius: 4px;
    cursor: pointer;

    .cover-cont {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        height: 150px;
        width: 100%;
        transition: 0.3s ease-in-out;
        background: linear-gradient(
        rgba(166, 81, 223, 0.4),
        rgba(155, 26, 245, 0.8)),
        url(${props => `/img/dashboard/newRoom/${props.purpose}.jpg`});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    
        clip-path: ${props => props.even 
                    ? 'polygon(0 0, 100% 0, 100% 89%, 0 100%)' 
                    : 'polygon(0 0, 100% 0, 100% 100%, 0 89%)'};
        -webkit-clip-path: ${props => props.even 
                    ? 'polygon(0 0, 100% 0, 100% 89%, 0 100%)' 
                    : 'polygon(0 0, 100% 0, 100% 100%, 0 89%)'};
    }

    .info-cont {
        padding: 1rem;
        min-height: 165px;
        position: relative;

        h5 {
            position: absolute;
            top: -80px;
            font-size: 2rem;
            font-weight: 100;
            letter-spacing: 2px;
            color: #ffffff;
        }

        svg {
            display: none;
        }
    }

    &:hover {
        box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.25);
    }
`;