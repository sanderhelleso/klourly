import React, { Component } from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PostComment extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.querySelector('#post-comment').focus();
    }

    render() {
        return (
            <StyledComment>
                <div className="row">
                    <div className="col l2">
                        <div className="avatar-cont">
                            <img 
                                src={this.props.photoUrl}
                            />
                        </div>
                    </div>
                    <div className="col l10">
                        <div className="info-cont col s12">
                            <h5>{this.props.displayName}</h5>
                            <p>You</p>
                        </div>
                        <div className="input-field col s12">
                            <textarea id="post-comment" class="materialize-textarea"></textarea>
                            <label htmlFor="post-comment">Post a new comment</label>
                            <StyledButton 
                                className="waves-effect waves-light btn"
                                disabled="true"
                            >
                                Post
                            </StyledButton>
                        </div>
                    </div>
                </div>
            </StyledComment>
        )
    }
}

const mapStateToProps = state => {
    return {
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        displayName: state.dashboard.userData.settings.displayName,
        photoUrl: state.dashboard.userData.settings.photoUrl
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);


const StyledComment = styled.div`

    margin: 3rem 0;
    padding: 1rem;
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
            margin-bottom: 1.25rem;
        }
        
    }
`;

const StyledButton = styled.a`
    color: #ffffff;
    background-color: #12e2a3;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.05);
    line-height: 0;
    letter-spacing: 2px;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 1.25rem;
    display: block;
    max-width: 100px;
    margin-top: 0.75rem;
    float: right;

    &:hover {
        box-shadow: 0px 12px 28px rgba(0,0,0,0.10);
        background-color: #12e2a3;
    }
`;