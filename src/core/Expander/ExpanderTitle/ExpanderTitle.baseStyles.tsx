import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, button, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';

export const expanderTitleBaseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodySemiBold')}
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  min-height: 60px;
  background-color: ${suomifiTheme.colors.highlightLight4};
  border-radius: inherit;
  padding: 17px ${suomifiTheme.spacing.xxxl} 16px ${suomifiTheme.spacing.m};
  white-space: break-word;
  word-wrap: break-word;

  &.fi-expander_title--open {
    background-color: ${suomifiTheme.colors.whiteBase};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  & .fi-expander_title-content {
    display: inline-block;
  }

  & .fi-expander_title-button {
    ${button(suomifiTheme)}
    ${font(suomifiTheme)('bodySemiBold')}
    color: ${suomifiTheme.colors.highlightBase};
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    width: 44px;
    height: 44px;
    padding: 12px;
    margin: 13px;

    &:focus {
      outline: 0;
    }

    &:focus-within {
      outline: 0;
      &:after {
        ${suomifiTheme.focus.absoluteFocus}
      }
    }
    ${suomifiTheme.focus.noMouseFocus}
    & * {
      cursor: pointer;
    }
    ${allStates('cursor: pointer;')}
  }

  & .fi-expander_title-icon {
    position: relative;
    height: 20px;
    width: 20px;
  }
  & .fi-expander_title--open .fi-expander_title-icon,
  & .fi-expander_title-icon--open {
    transform: rotate(-180deg);
  }
`;
