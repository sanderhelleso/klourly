import React, { Component } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import PostComment from './PostComment';

export default class Comments extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <StyledComments className="col s12">
                        <h5>Showing 6 comments</h5>
                    </StyledComments>
                </div>
                <PostComment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
        )
    }
}

const StyledComments = styled.div`
    
    margin-top: 4.5rem;

    h5 {
        font-size: 1.15rem;
        color: #bdbdbd;
        font-weight: 400;
    }
`;
