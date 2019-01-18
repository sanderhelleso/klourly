import React, { Component } from 'react';
import styled from 'styled-components';
import { Compass, Globe, Lock, Home } from 'react-feather';
import { helpers } from '../helpers/helpers';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../actions/newRoom/nextStageAction';


class Radius extends Component {
    constructor(props) {
        super(props);

        this.options = [
            {
                title: '5 Meters',
                className: 'room-option-stage4-option1',
                radius: 5,
                icon: <Lock size={45} />
            },
            {
                title: '10 Meters',
                className: 'room-option-stage4-option2',
                radius: 10,
                icon: <Compass size={45} />
            },
            {
                title: '20 Meters',
                className: 'room-option-stage4-option3',
                radius: 20,
                icon: <Globe size={45} />
            },
            {
                title: 'No Limit',
                className: 'room-option-stage4-option4',
                radius: false,
                icon: <Home size={45} />
            }
        ]
    }

    renderRadiusOptions = () => {
        return this.options.map(option => {
            return (
                <div key={option.radius} className="col s12 m6 l3">
                    <StyledOption
                        tabIndex={0}
                        className={`animated fadeIn no-select option-${this.options.indexOf(option) + 1}`}
                        onClick={(event) => helpers.selectOption(event, { radius: option.radius }, this.props)}
                    >
                        {option.icon}
                        <h5>{option.title}</h5>
                    </StyledOption>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="col s12">
                {this.renderRadiusOptions()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Radius);

const StyledOption = styled.div`
    padding: 4rem;
    text-align: center;
    box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.25);
    border-radius: 18px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    h5 {
        color: #ffffff;
        opacity: 0.8;
        letter-spacing: 4px;
        line-height: 30px;
    }

    svg {
        transition: 0.3s ease-in-out;
        stroke: #ffffff;
        pointer-events: none;
    }

    &:hover {
        box-shadow: 0px 36px 72px rgba(0, 0, 0, 0.30);
    }

    &.option-1 {
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(-220deg, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(-220deg, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    &.option-2 {
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(30deg, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(30deg, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    &.option-3 {
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(220deg, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(220deg, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    &.option-4 {
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(-30deg, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(-30deg, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
`;