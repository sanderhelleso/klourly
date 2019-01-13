import React, { Component } from 'react';
import styled from 'styled-components';
import { materializeJS } from '../../../../helpers/materialize';

export default class SelectMemberReport extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        materializeJS.M.FormSelect.init(document.querySelectorAll('select'), {});
    }

    renderMemberOptions() {
        
        return Object.values(this.props.data).map(member => {
            return <option 
                        key={member.id} 
                        data-icon={member.photoUrl}
                    >
                        {member.name}
                    </option>
        });
    }

    render() {
        return (
            <StyledSelectCont>
                <div class="input-field col s12 m10 l10">
                    <select class="icons">
                        <option value="" disabled selected>Choose a member</option>
                        {this.renderMemberOptions()}
                    </select>
                    <label>Select a member for individual report</label>
                </div>
            </StyledSelectCont>
        )
    }
}

const StyledSelectCont = styled.div`
    margin: 1rem 0;
`;
