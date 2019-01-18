import React from 'react';
import styled from 'styled-components';
import Stages from './stages/Stages';


const NewRoom = () => (
    <StyledNewRoom className="container">
        <Stages />
    </StyledNewRoom>
);

export default NewRoom;

const StyledNewRoom = styled.main`

    #new-room-stage {
        margin-bottom: 15vh;
    }

    .stage-icon {
        min-width: 256px;
    }

    .room-border {
        min-height: 0.45rem;
        min-width: 40%;
        max-width: 40%;
        margin: 3rem auto 1rem auto;
        border-radius: 12px;
        background-color: #00e988;
    }

    .room-option {
        padding: 5rem;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
        background-color: #ffffff;
        text-align: center;
    }

    .room-option-stage2-option1 {
        background: #ff4b1f;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #ff9068, #ff4b1f);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #ff9068, #ff4b1f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .room-option-stage2-option2 {
        background: #834d9b;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #d04ed6, #834d9b);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #d04ed6, #834d9b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .room-option-stage3-option1 {
        background: #B24592;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F15F79, #B24592);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F15F79, #B24592); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .room-option-stage3-option2 {
        background: #f46b45;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #eea849, #f46b45);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #eea849, #f46b45); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .room-option-stage4-option1 {
        background: #EB3349;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #F45C43, #EB3349);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #F45C43, #EB3349); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .room-option-stage4-option2 {
        background: #8E2DE2;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    .room-option-stage4-option3 {
        background: #00c6ff;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #0072ff, #00c6ff);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #0072ff, #00c6ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .room-option-stage4-option4 {
        background: #f953c6;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #b91d73, #f953c6);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #b91d73, #f953c6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }


    .room-option-deactive:hover {
        opacity: 1;
    }

    .room-option svg {
        transition: 0.3s ease-in-out;
        stroke: #ffffff;
        pointer-events: none;
    }

    .new-room-stage-4 .room-option {
        padding: 5rem 2rem;
    }

    .room-option h5, .new-room-stage-4 h5 {
        font-size: 1.25rem;
        text-transform: uppercase;
        letter-spacing: 4px;
        color: #ffffff;
        pointer-events: none;
        font-weight: 100;
    }

    .new-room-stage-4 h5 {
        font-size: 1rem !important;
    }

    #current-stage-status {
        margin-bottom: 1rem;
    }

    #current-stage-status #current-stage-status-stage {
        font-size: 1rem;
        color: #bdbdbd;
        float: right;
    }

    #current-stage-status h5 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 4rem;
        font-weight: 400;
    }

    #new-room-stage-cont {
        display: flex;         /* NEW, Spec - Firefox, Chrome, Opera */
        justify-content: center;
        align-items: center;
    }

    #new-room-stage input {
        max-width: 30rem;
        font-size: 1.5rem;
        outline: none;
        letter-spacing: 2px;
        font-weight: 800;
        transition: 0.3s ease-in-out;
    }

    #new-room-stage #select-start-week {
        margin: 1rem auto 0 auto;
        min-width: 15rem;
        max-width: 15rem;
        z-index: -100;
    }

    #new-room-name-field:focus, #select-start-week:focus {
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    }

    #new-room-cover-upload {
        border: 3px dashed #eeeeee !important;
        text-align: center !important;
        padding: 2rem !important;
        min-height: 17.5rem;
        min-width: 100% !important;
        color: #dadada !important;
        letter-spacing: 2px !important;
        transition: 0.5s ease-in-out !important;
    }

    #new-room-cover-upload h4 {
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 600;
        pointer-events: none;
    }

    #new-room-cover-upload h5 {
        font-weight: 100;
        pointer-events: none;
    }

    #new-room-cover-browse {
        margin: 1rem;
        font-size: 1rem;
        background: #7F00FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        border: none;
    }

    #new-room-cover-input {
        display: none;
    }

    .dropzone-active {
        border: 3px dashed #7c4dff !important;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    }

    #new-room-cover-file-name {
        color: #00e988;
        font-weight: 800 !important;
        margin: 0 !important;
        text-transform: uppercase;
        margin-bottom: 1rem !important;
        font-size: 1.5rem !important;
        letter-spacing: 4px !important;
    }

    .switch {
        margin:  0 auto;
        text-align: center;
        padding: 1.5rem;
    }

    #repeat-active-switch-cont , #starting-from-week-cont {
        margin-bottom: 2.5rem;
    }

    #repeat-active-switch-cont h5, #starting-from-week-cont h5 {
        font-size: 1.75rem;
        color: #9e9e9e;
        font-weight: 100;
        text-align: center;
    }

    #starting-from-week-cont p {
        color: #7c4dff;
        opacity: 0.5;
        padding: 0.5rem;
        cursor: pointer;
        font-weight: 100;
    }

    .lever {
        z-index: -100;
    }

    .switch label input[type=checkbox]:checked+.lever:after {
        background: #7F00FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .switch label input[type=checkbox]:checked+.lever {
        background: #f4c4f3;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #fc67fa, #f4c4f3);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #fc67fa, #f4c4f3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }

    .new-room-select-days {
        min-width: 20rem;
    }

    .collapsible-cont {
        min-height: 100vh;
    }

    .collapsible-header h5 span {
        text-align: right;
        font-weight: 100;
        float: right;
        color: #bdbdbd;
    }

    .collapsible-header h5 {
        margin: 0.5rem;
        width: 100%;
        font-size: 1.25rem;
        letter-spacing: 2px;
        float: left;
    }

    .timepicker-cont {
        margin: 1rem;
    }

    .select-days-cont {
        margin-bottom: 2rem;
    }

    #add-new-room-time {
        margin: 0 0rem 1rem 1rem;
        background-color: transparent;
        color: #00e988;
        font-size: 1.25rem;
        box-shadow: none;
        letter-spacing: 1px;
    }

    #add-new-room-time svg {
        margin-bottom: -5px;
    }

    #starting-from-week-cont {
        margin-top: 7.5rem;
    }

    #finish-room-creation-cont p {
        color: #bdbdbd;
        font-size: 12px;
        text-align: center;
        margin-top: -2rem;
    }

    #newRoom-map-cont {
        margin: 2rem 0 2rem 0;
        text-align: center;
        z-index: 1000 !important;
        opacity: 1;
    }

    .newRoom-maps-cont-active {
        opacity: 1;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    }

    .newRoom-maps-cont-disabled {
        opacity: 0.3;
        cursor: not-allowed;
        pointer-events: none;
        box-shadow: none !important;
    }

    #main-map-cont {
        max-width: 100% !important;
        min-width: 100% !important;
        min-height: auto;
        max-height: auto;
        transition: ease-in-out 0.3s;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    }

    #newRoom-map-geoCoords {
        margin: 1rem 0 4rem 0;
        font-size: 0.8rem;
        color: #bdbdbd;
        line-height: 1.5;
        pointer-events: auto;
        cursor: pointer;
    }

    #location-hint {
        letter-spacing: 1px;
        margin-top: 1.5rem;
        font-size: 0.70rem;
        color: #bdbdbd;
    }

    #geoCoords-address {
        margin-top: 3rem;
        font-size: 1.25rem;
        letter-spacing: 1px;
        color: #bdbdbd;
    }

    .new-room-cover {
        cursor: pointer;
    }

    .new-room-cover-default {
        cursor: not-allowed !important;
        z-index: 1000;
    }

    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: .5s ease;
        background-color: #008CBA;
        border-radius: 6px;
    }

    #cover-preview {
        display: flex;
        max-height: 17.5rem;
        position: relative;
        width: 50%;
        padding: 0 !important;
        border-radius: 6px;
        cursor: not-allowed;
    }

    #cover-preview img {
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        border-radius: 6px;
    }
    .new-room-cover:hover .overlay {
        opacity: 1;
    }

    .cover-preview-text svg {
        stroke: #EB3349;
    }

    .cover-preview-text span {
        font-size: 0.9rem;
        margin-top: 1rem;
        color: #9e9e9e;
    }

    .cover-preview-text {
        position: absolute;
        font-weight: 100;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        letter-spacing: 1px;
        text-align: center;
    }

    .new-room-cover .overlay {
        cursor: pointer;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: 0.3s ease-in-out;
        background-color: rgba(20, 20, 20, 0.9);
    }
`;
