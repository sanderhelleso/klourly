import React from 'react';
import styled from 'styled-components';
import { Trash2 } from 'react-feather';

const Member = props => (
    <div key={props.data.email} className="col s12 m6 l6 animated fadeIn">
        <MemberCard>
            <div className="row">
                <div className="col s4 m4 l4 avatar-cont">
                    <img src={props.data.photoUrl} alt={`${props.data.displayName}'s avatar`} />
                </div>
                <div className="col s5 m5 l6">
                    <h5>{props.data.name}</h5>
                    <p>{props.data.email}</p>
                </div>
                <div className="col s3 m3 l2">
                    <Trash2 size={30} />
                </div>
            </div>
        </MemberCard>
    </div>
);

export default Member;

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
