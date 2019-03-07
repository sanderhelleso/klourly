import React, { Component } from 'react';
import styled from 'styled-components';

const NO_ACHIEVEMENTS_ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-achievements.svg?alt=media&token=efc1d990-3c15-49d6-b78e-eb71b81196cb';
const ACHIEVEMENTS_TXT = 'You have no achievements';

class NoAchievements extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <StyledPlaceholder className="col s12 m12 l12 animated fadeIn">
                <img src={NO_ACHIEVEMENTS_ICON} alt="No achievements available" />
                <p>
                    {ACHIEVEMENTS_TXT}
                </p>
            </StyledPlaceholder>
        );
    }
}


export default NoAchievements;

const StyledPlaceholder = styled.div`

    text-align: center;
    min-height: 220px !important;
    margin-top: 5rem;

    img {
        width: 256px;
    }

    p {
        color: #9e9e9e;
        font-weight: 400;
        max-width: 550px;
        margin: 1rem auto;
        margin-bottom: 1.25rem;
    }
`;