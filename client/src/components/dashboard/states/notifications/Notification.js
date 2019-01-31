import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../../helpers/format';
import history from '../../../../helpers/history';

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
                        
                            <a onClick={() => {
                                const route = this.props.data.redirect.redirectTo.split('/');
                                history.push(route.slice(3, route.length).join('/')); // remove domain form route
                            }}>
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
            font-size: 1.15rem;
            margin: 0.25rem 0 0.75rem 0;
        }

        p {
            color: #9e9e9e;
            font-size: 0.9rem;
            opacity: 0.8;
            margin: 0rem;
        }
    }

    a {
        color: #363636;
        opacity: 0.8;
        font-size: 1rem;
        font-weight: 800;
        color: #b388ff;
    }
`;
