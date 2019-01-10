import React, { Component } from 'react';
import styled from 'styled-components';

export default class Notification extends Component {
    render() {
        return (
            <StyledNotification className="row">
                <div className="col s12">
                    <div className="col s3 avatar-cont">
                        <img 
                            src="/img/dashboard/stock.jpg"
                        />
                    </div>
                    <div className="message-cont col s9">
                        <span className="author">
                            Kevin Hearth
                        </span>
                        <span className="message">
                            just activated a room
                        </span>
                        <span className="timestamp">
                            9. January 2019 09:54
                        </span>
                    </div>
                </div>
            </StyledNotification>
        )
    }
}

const StyledNotification = styled.div`

    position: relative;

    .avatar-cont {
        margin-top: 5px;
        text-align: center;
        max-width: 70px;
    }

    img {
        border-radius: 50%;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        min-height: 35px;
        min-width: 35px;
        max-height: 35px;
        max-width: 35px;
    }

    .message-cont {
        position: relative;
        padding: 0;

        span {
            display: inline-block;
            font-size: 0.8rem;
            color: #ffffff;
        }

        .message {
            opacity: 0.5;
            margin-left: 3px;
        }

        .timestamp {
            display: block;
            font-size: 0.7rem;
            color: #8a79af;
            opacity: 0.7;
        }

        @media screen AND (max-width: 1100px) {
            padding-left: 10px;
        }
    }
`;
