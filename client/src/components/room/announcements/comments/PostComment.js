import React, { Component } from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from '../../../../helpers/notification';
import { room } from '../../../../api/room/room';

class PostComment extends Component {
    constructor(props) {
        super(props);

        this.MAX_LENGTH_COMMENT = 500;
        this.postError = `Post must be between 1 - ${this.MAX_LENGTH_COMMENT} characters`;

        this.state = {
            valid: false,
            comment: ''
        }
    }

    updateComment = e => {
        this.setState({ 
            [e.target.name]: e.target.value,
            valid: e.target.value.trim() !== '' && e.target.value.length <= this.MAX_LENGTH_COMMENT
        });
    }

    postComment = async () => {

        // validate comment
        if (this.state.comment === '' || this.state.comment.length > this.MAX_LENGTH_COMMENT) {
            return notification.error(this.postError);
        }

        this.setState({ valid: false });

        // attempt to post comment
        const response = await room.postAnnouncementComment(
            this.props.userID,
            this.props.roomID,
            this.props.announcementID,
            {
                author: {
                    displayName: this.props.displayName,
                    photoUrl: this.props.photoUrl
                },
                comment: this.state.comment,
                postedAt: new Date().getTime()
            }
        );

        // display notification depending on result
        if (response.data.success) {
            notification.success(response.data.message);
            this.setState({ valid: false, comment: '' });
        }

        else {
            notification.error(response.data.message);
            this.setState({ valid: false });
        }
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
                            <textarea 
                                id="post-comment" 
                                name="comment"
                                className="materialize-textarea"
                                value={this.state.comment}
                                onChange={(e) => this.updateComment(e)}
                            />
                            <label htmlFor="post-comment">Post a new comment</label>
                            <StyledMessage>
                                {this.state.comment.length} / {this.MAX_LENGTH_COMMENT}
                            </StyledMessage>
                            <StyledButton 
                                className="waves-effect waves-light btn"
                                disabled={this.state.valid ? false : true}
                                onClick={this.postComment}
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
    padding: 1rem 1rem 3rem 1rem;
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
    margin-top: 0.2rem;

    &:hover {
        box-shadow: 0px 12px 28px rgba(0,0,0,0.10);
        background-color: #12e2a3;
    }
`;

const StyledMessage = styled.span`
    color: #9e9e9e;
    font-weight: 100;
    font-size: 0.9rem;
    float: right;
`;