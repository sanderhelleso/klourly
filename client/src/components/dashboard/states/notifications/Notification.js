import React, { Component } from 'react';
import styled from 'styled-components';

export default class Notification extends Component {
    render() {
        return (
            <StyledNotification>
                <div className="row">
                    <div className="col l2">
                        <div className="avatar-cont">
                            <img 
                                src="/img/dashboard/stock.jpg" 
                            />
                        </div>
                    </div>
                    <div className="col l10">
                        <div className="info-cont col s12">
                            <h5>John Doe <span>20.20.2020</span></h5>
                        </div>
                        <div className="col s12">
                            <a>Enter Room</a>
                        </div>
                    </div>
                </div>
            </StyledNotification>
        )
    }
}

const StyledNotification = styled.div`

    margin: 1rem 0;
    padding: 1rem;

    .row {
        margin-bottom: 0;

        .l2 {
            max-width: 60px !important;
        }
    }

    .avatar-cont {

        img {
            margin: 1rem 0;
            border-radius: 50%;
            box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
            min-height: 45px;
            min-width: 45px;
            max-height: 45px;
            max-width: 45px;
        }
    }

   .info-cont {
        h5 {
            font-weight: 600;
            font-size: 1.15rem;
            margin-bottom: 1rem;

            span {
                color: #9e9e9e;
                font-size: 0.8rem;
                opacity: 0.8;
                margin: 0;
                font-weight: 400;
                margin-left: 0.5rem;
            }
        }
    }

    a {
        color: #363636;
        opacity: 0.8;
        font-size: 0.9rem;
        font-weight: 800;
        color: #b388ff;
        padding: 0.35rem 0.75rem;
        border: 1px solid #b388ff;
        opacity: 0.6;
    }
`;
