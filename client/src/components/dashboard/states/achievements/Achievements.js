import React, { Component } from 'react'
import NoAchievements from './NoAchievements';

export default class Achievements extends Component {
    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>Achievements</h3>
                <p id='dashboard-intro'>Earn rewards, points and compete to become the best</p>
                <NoAchievements />
            </div>
        )
    }
}
