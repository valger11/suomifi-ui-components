import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

/* stylelint-disable no-descending-specificity */
const checkedStyles = css`
  &.fi-checkbox--checked {
    & .fi-checkbox_label {
      &::before {
        border-color: ${suomifiTheme.colors.highlightBase};
      }
      & > .fi-checkbox_icon .fi-icon-base-fill {
        fill: ${theme.colors.highlightBase};
      }
    }
  }
`;

const disabledStyles = css`
  &.fi-checkbox--disabled {
    & .fi-checkbox_label {
      cursor: not-allowed;
      color: ${suomifiTheme.colors.depthBase};
      &::before {
        background-color: ${suomifiTheme.colors.depthLight3};
        border-color: ${suomifiTheme.colors.depthLight1};
        border-width: 1px;
      }
      & > .fi-checkbox_icon .fi-icon-base-fill {
        fill: ${theme.colors.depthLight1};
      }
    }
    &.fi-checkbox--large {
      & .fi-checkbox_label::before {
        border-width: 2px;
      }
    }
  }
`;

const errorStyles = css`
  &.fi-checkbox--error {
    & .fi-checkbox_label {
      &::before {
        border-color: ${suomifiTheme.colors.alertBase};
        border-width: 2px;
      }
      & > .fi-checkbox_icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }
  }
`;

const largeVariantStyles = css`
  &.fi-checkbox--large {
    & .fi-checkbox_label {
      padding-left: ${suomifiTheme.spacing.xxl};
      min-height: 30px;

      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        box-sizing: border-box;
        height: 30px;
        width: 30px;
        color: ${suomifiTheme.colors.depthDark3};
        border: 2px solid;
      }
      & .fi-checkbox_icon {
        height: 20px;
        width: 20px;
        left: 5px;
        top: 4px;
      }
    }
    & .fi-hint-text {
      padding-left: ${suomifiTheme.spacing.xxl};
    }
  }
`;

export const baseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}

    & .fi-checkbox_label {
    position: relative;
    display: block;
    padding-left: ${suomifiTheme.spacing.l};
    cursor: pointer;
    min-height: 27px;
    line-height: 1.5em;
    padding-top: 1px;
    &::before {
      content: '';
      position: absolute;
      left: 0px;
      top: ${suomifiTheme.spacing.xxs};
      box-sizing: border-box;
      height: 18px;
      width: 18px;
      border: 1px solid ${suomifiTheme.colors.depthDark3};
      border-radius: ${suomifiTheme.radius.basic};
      background-color: ${suomifiTheme.colors.whiteBase};
    }
  }
  & .fi-checkbox_icon {
    position: absolute;
    height: 10px;
    width: 10px;
    left: 4px;
    top: 9px;
  }

  &:focus-within {
    & .fi-checkbox_label {
      &::before {
        ${suomifiTheme.focus.boxShadowFocus}
      }
    }
  }

  & .fi-checkbox_input {
    position: absolute;
    opacity: 0;
    z-index: -9999;
  }

  & .fi-hint-text {
    padding-left: ${suomifiTheme.spacing.l};
    color: ${suomifiTheme.colors.depthDark1};
    margin-bottom: 0;
  }

  & .fi-status-text {
    display: block;
    line-height: 18px;
  }

  ${largeVariantStyles};
  ${checkedStyles};
  ${errorStyles};
  ${disabledStyles};
`;
