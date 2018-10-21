import React, { Component } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: 1,
            lastStage: 5,
            selected: false
        }

        this.displayStageStatus = this.displayStageStatus.bind(this);
    }

    displayStageStatus() {
        return `Step ${this.state.stage} / ${this.state.lastStage}`;
    }


    render() {
        return (
            <div>
                <div id="current-stage-status">
                    <h5>{this.displayStageStatus()}</h5>
                </div>
                <div id="new-room-stage-cont" className="col s10 offset-s1">
                    <div className="col s1 toogle-prev-next">
                        <ArrowLeft size={42} />
                    </div>
                    <div className="col s5">
                        <div className="room-option">
                            public
                        </div>
                    </div>
                    <div className="col s5">
                        <div className="room-option">
                            private
                        </div>
                    </div>
                    <div className="col s1 toogle-prev-next">
                        <ArrowRight size={42} />
                    </div>
                </div>
            </div>
        )
    }
}
