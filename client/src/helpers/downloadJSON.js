export const downloadJSON = format => {

    // generate a file blob
    const blob = new Blob([format.data], { ...format.type });

    // if navigator is present, download file immediatly
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, `${format.fileName}${format.extension}`);
        return;
    }

    // if navigator is not present, manually create file and download
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = `${format.fileName}${format.extension}`;        
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
}