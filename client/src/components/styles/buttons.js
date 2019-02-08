import styled from 'styled-components';
import theme from 'styled-theming';

const backgroundColor = theme('mode', {
  light: '#12e2a3',
  dark: '#b388ff',
});

const BUTTON_STYLES = `
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
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
    clear: both;
`;

export const StyledButtonMain = styled.a`
    color: #ffffff;
    background-color: ${backgroundColor};
    ${BUTTON_STYLES};

    &:hover {
        box-shadow: 0px 18px 56px rgba(0,0,0,0.15);
        background-color: ${backgroundColor};
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