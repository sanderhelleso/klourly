import React, { Component } from 'react'

export default class DownloadJSON extends Component {
    constructor(props) {
        super(props);
    }

    download() {

        const filename ='test.json'

        // generate a file blob
        const blob = new Blob([JSON.stringify({test: 123}, null, 2)], {type: 'application/json'});

        // if navigator is present, download file immediatly
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
            return;
        }

        // if navigator is not present, manually create file and download
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }

    render() {
        return (
            <div>
                <a class="waves-effect waves-purple btn-flat" onClick={this.download} >
                    JSON
                </a>
            </div>
        )
    }
}
