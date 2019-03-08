import styled from 'styled-components';
import theme from 'styled-theming';

const backgroundColor = theme('mode', {
  light: '#12e2a3',
  dark: '#b388ff',
});

const BUTTON_STYLES = `
    -webkit-box-shadow: 0px 12px 30px 0px rgba(0, 226, 163, 0.5);
    -moz-box-shadow:    0px 12px 30px 0px rgba(0, 226, 163, 0.5);
    box-shadow:         0px 12px 30px 0px rgba(0, 226, 163, 0.5);
    line-height: 0;
    -webkit-letter-spacing: 2px;
    -moz-letter-spacing: 2px;
    -ms-letter-spacing: 2px;
    font-size: 1rem;
    font-weight: 600;
    padding: 1.75rem;
    display: block;
    max-width: 320px;
    margin: 2rem auto 0 auto;
    text-transform: uppercase;
    clear: both;
    transition: 0.3s ease-in-out;
    border-radius: 4px;
`;

export const StyledButtonMain = styled.a`
    color: #ffffff;
    background-color: ${backgroundColor};
    ${BUTTON_STYLES};

    &:hover, &:focus {
        -webkit-box-shadow: none !important;
        -moz-box-shadow:    none !important;
        box-shadow:         none !important;
        background-color: ${backgroundColor};
    }

    &:disabled {
        -webkit-box-shadow: none !important;
        -moz-box-shadow:    none !important;
        box-shadow:         none !important;
    }
`;

export const StyledButtonCancel = styled.a`
    color: #757575;
    background-color: #bdbdbd;
    ${BUTTON_STYLES};

    &:hover {
        background-color: #bdbdbd;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    }
`;