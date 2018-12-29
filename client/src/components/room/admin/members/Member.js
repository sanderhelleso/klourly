import React, { Component } from 'react';
import styled from 'styled-components';
import { Trash2 } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setConfirmDeleteMemberAction } from '../../../../actions/room/setConfirmDeleteMemberAction';

class Member extends Component {
    constructor(props) {
        super(props);
    }

    confirmDelete(deleteMemberData) {

        // update delete member confirmation data and open modal for confirmation
        this.props.setConfirmDeleteMemberAction(deleteMemberData);
    }

    render() {
        return (
            <div className="col s12 m6 l6 animated fadeIn">
                <MemberCard>
                    <div className="row">
                        <div className="col s4 m4 l4 avatar-cont">
                            <img 
                                src={this.props.data.photoUrl} 
                                alt={`${this.props.data.displayName}'s avatar`} 
                            />
                        </div>
                        <div className="col s5 m5 l6">
                            <h5>{this.props.data.name}</h5>
                            <p>{this.props.data.email}</p>
                        </div>
                        <div className="col s3 m3 l2">
                            <span onClick={() => this.confirmDelete(this.props.data)}>
                                <Trash2 size={30} />
                            </span>
                        </div>
                    </div>
                </MemberCard>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setConfirmDeleteMemberAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(Member);


const MemberCard= styled.div`
    margin: 1.5rem 0.5rem;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;

    .row {
        margin-bottom: 0;
    }

    .avatar-cont {
        text-align: center;
    }

    img {
        margin-top: 1.25rem;
        border-radius: 50%;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        min-height: 55px;
        min-width: 55px;
        max-height: 55px;
        max-width: 55px;
    }

    h5 {
        font-weight: 800;
    }

    p {
        color: #9e9e9e;
        font-size: 0.9rem;
        opacity: 0.7;
    }

    svg {
        display: block;
        margin-top: 1.75rem;
        margin-right: 1rem;
        stroke: #ff5252;
        cursor: pointer;
        opacity: 0.7;
        transition: 0.3s ease-in-out;
    }

    svg:hover {
        opacity: 1;
    }
    
`;
