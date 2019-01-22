import React, { Component } from 'react';
import styled from 'styled-components';
import Time from '../Time';
import NextStage from '../NextStage';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Times extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {

        // if times are present in store, render
        if (this.props.times) this.createTimesFromState(this.props.times);
        else this.setState({ times: [] });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.times) this.createTimesFromState(nextProps.times);
    }


    createTimesFromState(data) {

        const times = [];
        Object.entries(data).forEach(([key, time]) => {
            times.push(<Time key={key} nr={key} data={time} />);
        });

        this.setState({ times });
    }

    addTime = () => {
        this.setState({
            times: [...this.state.times, 
                    <Time 
                        key={this.state.times.length + 1} 
                        nr={this.state.times.length + 1} 
                        data={false} 
                    />
            ]
        });
    }

    renderTimes = () => {

        if (this.state.times.length === 0) 
            return <h5 className="animated fadeIn">No room times added</h5>;

        return this.state.times.map(time => time);
    }

    render() {
        return (
            <div className="col s12 m12 l12">
                <div className="col s12 m8 offset-m2 l6">
                    <StyledAddButton 
                        className="waves-effect waves-light btn animated fadeIn"
                        onClick={this.addTime}
                    >
                        Add new time
                    </StyledAddButton>
                </div>
                <div className="col s12 m8 offset-m2 l6">
                    <StyledNextCont>
                        <NextStage 
                            message={this.props.message} 
                            valid={true}
                        />
                    </StyledNextCont>
                </div>
                <StyledRow className="row">
                    {this.renderTimes()}
                </StyledRow>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { times: state.dashboard.newRoom.times };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Times);



const StyledRow = styled.div`
    clear: both;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
    margin-top: 10rem;

    h5 {
        text-align: center;
        margin: 7rem auto;
        font-size: 2.5rem;
        font-weight: 100;
        letter-spacing: 2px;
        color: #bdbdbd;
        opacity: 0.8;
    }
`;

const StyledNextCont = styled.div`
    
    a {
        float: right !important;

        @media screen and (max-width: 1000px) {
            float: none;
            min-width: 100%;
            margin-bottom: 5rem;
        }

        @media screen and (max-width: 400px) {
            font-size: 0.9rem;
            letter-spacing: 1px;
        }

        @media screen and (max-width: 355px) {
            font-size: 0.8rem;
            letter-spacing: 0.5px;
        }
    }
`

const StyledAddButton = styled.a`
    box-shadow: none;
    color: #12e2a3;
    background-color: transparent;
    border: 2px solid #12e2a3;
    line-height: 0;
    letter-spacing: 2px;
    transition: 0.3s ease-in-out;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 1.5rem;
    display: block;
    float: left;
    margin: 2rem 1rem;

    &:hover {
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        background-color: #12e2a3;
        color: #ffffff;
    }

    @media screen and (max-width: 1000px) {
        float: none;
        margin: 0;
    }

    @media screen and (max-width: 400px) {
        font-size: 0.9rem;
        letter-spacing: 1px;
    }

    @media screen and (max-width: 355px) {
        font-size: 0.8rem;
        letter-spacing: 0.5px;
    }
`;
