import React, { Component } from 'react';
import styled from 'styled-components';
import { Headphones, PieChart, } from 'react-feather';
import ConfirmPurposeModal from '../helpers/ConfirmPurposeModal';


export default class Purpose extends Component {
    constructor(props) {
        super(props);

        this.purposeOptions = {
            event: {
                icon: <Headphones size={35} />,
                title: 'Event',
                text: 'Keep track of your events members and schedule. Perfect for any event where attendence is mandatory'
            },
            education: {
                icon: <PieChart size={35} />,
                title: 'Education',
                text: 'Education is important. Get detailed overview of your students attendence and increase productivity'
            },
            business: {
                icon: <PieChart size={35} />,
                title: 'Business',
                text: 'Incorrect billing amounts ends now. Get full control of attendence and billing for your business'
            }
        }

        this.state = {
            modalData: {}
        };
    }

    renderCards = () => {

        let i = 0;
        return Object.values(this.purposeOptions).map(option => {
            i++;
            return (
                <div key={option.title} className="col s4">
                    <StyledCard
                        purpose={option.title.toLowerCase()}
                        even={i % 2 === 0}
                        tabIndex={0}
                        className="animated fadeIn no-select modal-trigger"
                        data-target="confirm-room-purpose-modal" 
                        onClick={() => this.setState({ modalData: option })}
                    >
                        <div className="cover-cont">
                    </div>
                        <div className="info-cont">
                            <h5>{option.title}</h5>
                            <p>{option.text}</p>
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
                <ConfirmPurposeModal data={this.state.modalData} />
            </div>
        )
    }
}

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
        rgba(166, 81, 223, 0.7),
        rgba(155, 26, 245, 0.7)),
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
        max-height: 165px;
        position: relative;

        h5 {
            position: absolute;
            top: -80px;
            font-size: 2rem;
            font-weight: 100;
            letter-spacing: 2px;
            color: #ffffff;
        }

        p {
            text-align: left;
            color: #9e9e9e;
            max-width: 75%;
            margin: 1rem auto;
        }

        @media screen and (max-width: 1300px) {
            p {
                max-width: 95%;
            }
        }
    }

    &:focus {
        outline:0;
    }
    &:hover {
        box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.25);
    }

    @media screen and (max-width: 1300px) {
        margin: 0;    
    }
`;