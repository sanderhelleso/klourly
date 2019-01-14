import React, { Component } from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'react-feather';
import { redirect } from '../../helpers/redirect';


export default class Back extends Component {
    constructor(props) {
        super(props);
    }

    renderBack() {

        let navigate = {
            label: '',
            redirect: ''
        };

        console.log(this.props);

        switch(this.props.location) {
            case 'dashboard':
                navigate.label = 'Dashboard';
                navigate.redirect = () => redirect.dashboard();
                break;

            case 'reports':
                navigate.label = 'Reports';
                navigate.redirect = () => redirect.roomAdminReports(this.props.roomID);
                break;

            case 'room':
                navigate.label = 'Room';
                navigate.redirect = () => redirect.room(this.props.roomID);
                break;

        }

        console.log(navigate);
        return <a onClick={navigate.redirect}><ArrowLeft /> Back to {navigate.label}</a>

    }

    render() {
        return (
            <StyledBack>
                {this.renderBack()}
            </StyledBack>
        )
    }
}




const StyledBack = styled.div`

    margin: 4rem 0 15vh 0;

    a {
        color: #bdbdbd;
    }

    svg {
        stroke: #7c4dff;
        margin-bottom: -6px;
        margin-right: 5px;
    }
`;

/* <StyledBack>
        <a className="waves-effect waves-light animated fadeIn"
            onClick={
                props.to === 'Dashboard'
                ? redirect.dashboard
                : redirect.room(props.roomID)
            }
        >
            <ArrowLeft size={18} />
            {`Back To ${props.to}`}
        </a>
    </StyledBack>*/