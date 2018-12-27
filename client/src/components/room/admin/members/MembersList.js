import React, { Component } from 'react';
import styled from 'styled-components';

export default class MembersList extends Component {
    render() {
        return (
            <StyledMembersList>
                List of members...
            </StyledMembersList>
        )
    }
}

const StyledMembersList = styled.div`
    margin-top: 4rem;
    padding: 4rem 0;
    border-top: 1px solid #eeeeee;
`;
