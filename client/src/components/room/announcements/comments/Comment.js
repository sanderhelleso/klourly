import React, { Component } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { format } from '../../../../helpers/format';

export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fade>
                <StyledComment>
                    <div className="row">
                        <div className="col l2">
                            <div className="avatar-cont">
                                <img 
                                    src={this.props.data.author.photoUrl} 
                                    alt={`${this.props.data.author.displayName}'s avatar`}
                                />
                            </div>
                        </div>
                        <div className="col l10">
                            <div className="info-cont col s12">
                                <h5>{this.props.data.author.displayName}</h5>
                                <p>{format.getFormatedDateAndTime(this.props.data.postedAt)}</p>
                            </div>
                            <div className="col s12">
                                <p>{this.props.data.comment}</p>
                            </div>
                        </div>
                    </div>
                </StyledComment>
            </Fade>
        )
    }
}

const StyledComment = styled.div`

    margin: 1rem 0;
    padding: 1.5rem 1rem 3rem 1rem;
    border-bottom: 1px solid #eeeeee;

    .row {
        margin-bottom: 0;
    }

    .avatar-cont {

        text-align: right;

        img {
            margin: 1rem 0;
            border-radius: 50%;
            box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
            min-height: 65px;
            min-width: 65px;
            max-height: 65px;
            max-width: 65px;
        }
    }

   .info-cont {
        h5 {
            font-weight: 600;
            font-size: 1.35rem;
            margin-bottom: 0.5rem;
        }

        p {
            color: #9e9e9e;
            font-size: 1rem;
            opacity: 0.8;
            margin: 0;
            font-weight: 400;
        }
    }

    p {
        color: #363636;
        opacity: 0.8;
        font-size: 0.9rem;
        margin-top: 1.15rem;
        font-weight: 800;
    }
`;
