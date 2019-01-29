import React, { Component } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

export default class Comment extends Component {
    render() {
        return (
            <Fade>
                <StyledComment>
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
                                <h5>John Doe</h5>
                                <p>28 01 2019</p>
                            </div>
                            <div className="col s12">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum augue nulla, accumsan vel mollis eu, ultricies vel tellus. Curabitur eu laoreet lectus. Proin nec sollicitudin sapien, volutpat blandit nisi. Proin posuere aliquam turpis quis pellentesque. Morbi facilisis lorem vel neque congue, non dapibus nulla interdum. Sed iaculis sit amet dui tristique dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In et tempor neque, ut congue nisl. Sed cursus dolor in lectus faucibus sagittis. Curabitur varius lectus non interdum sollicitudin.</p>
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
