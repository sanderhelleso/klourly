import React, { Component } from 'react';

import AlgoliaPlaces from 'algolia-places-react';

import { algolia } from '../../api/algolia/algolia';

export default class Algolia extends Component {
    constructor() {
        super();

        this.state = {
            keys: null
        }
    }

    componentWillMount() {
        this.getKeys();
    }

    async getKeys() {
        const keys = await algolia.keys();
        this.setState({
            keys: keys
        });
    }

    renderAlgoliaSearch() {
        return this.state.keys ? this.algolia() : null;
    }

    algolia() {
        return (
            <AlgoliaPlaces
            placeholder='Enter room location'
    
            options={{
                ...this.state
            }}
            />
        )
    }


    render() {

        return this.renderAlgoliaSearch();
    }
}
