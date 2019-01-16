import React from 'react';
import ChangeAvatar from './ChangeAvatar';
import Form from './Form';

const Settings = () => (
    <div className='animated fadeIn'>
        <h3 id='dashboard-title'>Settings</h3>
        <p id='dashboard-intro'>Customize your profile settings</p>
        <div className="row">
            <ChangeAvatar />
            <Form />
        </div>
    </div>
);

export default Settings;

