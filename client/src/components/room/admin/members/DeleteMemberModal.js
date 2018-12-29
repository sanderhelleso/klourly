import React, { Component } from 'react';
import { materializeJS } from '../../../../helpers/materialize';

export default class DeleteMemberModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // prepeare modal
        const modal = document.querySelectorAll('.modal');
        materializeJS.M.Modal.init(modal, {});
    }

    render() {
        return (
            <div id="confirm-delete-member-modal" className="modal">
                <div className="modal-content">
                    <h4>{this.props.data.name}</h4>
                </div>
            </div>
        )
    }
}
