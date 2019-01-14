import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MemberReport extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    renderMemberReport() {

        if (this.props.userData) {
            console.log(this.props.userData)
            return <p>LOADED</p>
        }

        return <p>Loading...</p>
    }

    render() {
        return (
            <div className="container">
                <h1>Member Report</h1>
                {this.renderMemberReport()}
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {

    // get user
    return { userData: state.room.activeRoom.membersData
                        ? Object.values(state.room.activeRoom.membersData)
                          .filter(member => member.id === props.match.params.memberID)[0]
                        : null  
            }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberReport);
