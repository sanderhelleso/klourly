export const update = {
    setActiveRoom
}

function setActiveRoom(snapshot, response, props, checkinID) {

    console.log(response);

    const checkinData = {
        ...snapshot.val(),
        ...response,
        attendies: snapshot.hasChild('attendies') 
            ? snapshot.val().attendies : {},
    }

    // clear up props if type 'code'
    if (props.type === 'code') {
        delete checkinData.membersData;
        delete checkinData.membersList;
    }

    // update the checkin state of the created checking ref
    props.updateActiveCheckinStatusAction({
        checkinID,
        checkinData
    });
}