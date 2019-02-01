import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../../helpers/format';
import { redirect } from '../../../../helpers/redirect';

export default class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledNotification>
                <div className="row">
                    <div className="col l2">
                        <div className="avatar-cont">
                            <img 
                                src={this.props.data.image}
                                alt="Notification logo"
                            />
                        </div>
                    </div>
                    <div className="col l10">
                        <div className="info-cont col s12">
                            <p>{format.tsToHHMM(this.props.data.timestamp)}</p>
                            <h5>{this.props.data.message}</h5>
                        </div>
                        <div className="col s12">
                        
                            <a onClick={() => redirect.notification(this.props.data.redirect.redirectTo)}>
                                {this.props.data.redirect.redirectText}
                            </a>
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
            margin: 1.1rem 0;
            border-radius: 50%;
            box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
            min-height: 50px;
            min-width: 50px;
            max-height: 50px;
            max-width: 50px;
        }
    }

   .info-cont {
        h5 {
            font-size: 1rem;
            font-weight: 400;
            margin: 0.5rem 0 0.75rem 0;
        }

        p {
            color: #9e9e9e;
            font-size: 0.9rem;
            opacity: 0.8;
            margin: 0rem;
        }
    }

    a {
        opacity: 0.8;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 1px;
        color: #b388ff;
    }
`;
