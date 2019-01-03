import React from 'react';

const OwnerAvatar = props => (
    <div id="room-owner-avatar">
         <img 
            className="animated fadeIn z-depth-3" 
            src={props.url} 
        />
    </div>
)

export default OwnerAvatar;