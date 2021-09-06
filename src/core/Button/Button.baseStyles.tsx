import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { button } from '../theme/reset';
import { alphaHex } from '../../utils/css';

const invertedStyles = (theme: SuomifiTheme) => css`
  &.fi-button--inverted {
    background: none;
    background-color: ${theme.colors.highlightBase};
    border: 1px solid ${theme.colors.whiteBase};
    text-shadow: none;

    &:hover {
      background: ${theme.gradients.whiteBaseNegative};
    }

    &:active {
      background: none;
      background-color: ${theme.colors.highlightBase};
    }

    &.fi-button--disabled,
    &[disabled],
    &:disabled {
      opacity: 0.41;
      background: none;
      background-color: none;
    }
  }
`;

const secondary = (theme: SuomifiTheme) => css`
  color: ${theme.colors.highlightBase};
  background: none;
  background-color: ${theme.colors.whiteBase};
  border: 1px solid ${theme.colors.highlightBase};
  text-shadow: none;

  &:hover {
    background: ${theme.gradients.whiteBaseToDepthLight2};
  }

  &:active {
    background: none;
    background-color: ${theme.colors.depthLight2};
  }

  &.fi-button--disabled,
  &[disabled],
  &:disabled {
    color: ${theme.colors.depthBase};
    text-shadow: none;
    background: none;
    background-color: ${theme.colors.highlightLight4};
    border-color: ${theme.colors.depthBase};
  }
`;

const secondaryStyles = (theme: SuomifiTheme) => css`
  &.fi-button--secondary {
    ${secondary(theme)}
  }
`;

const secondaryNoBorderStyles = (theme: SuomifiTheme) => css`
  &.fi-button--secondary-noborder {
    ${secondary(theme)}
    border: none;
    background-color: transparent;
  }
`;

const linkStyles = (theme: SuomifiTheme) => css`
  &.fi-button--link {
    color: ${theme.colors.highlightBase};
    ${secondary(theme)}
    background: ${theme.gradients.depthSecondaryToDepthSecondaryDark1};
    border: none;

    &:hover {
      background: ${theme.gradients.highlightLight4ToDepthSecondary};
    }

    &:active {
      background: ${theme.gradients.depthLight3ToDepthLight2};
    }

    &.fi-button--disabled,
    &[disabled],
    &:disabled {
      color: ${theme.colors.depthBase};
      background: none;
      background-color: ${theme.colors.depthLight3};
    }
  }
`;

export const baseStyles = (theme: SuomifiTheme) => css`
  ${button(theme)}
  padding: ${theme.spacing.insetL} ${theme.spacing.insetXxl};
  min-height: 40px;
  color: ${theme.colors.whiteBase};
  background: ${theme.gradients.highlightBaseToHighlightDark1};
  border-radius: ${theme.radius.basic};
  text-align: center;
  text-shadow: ${theme.shadows.invertTextShadow};
  cursor: pointer;

  &:focus {
    outline: none;
    position: relative;

    &::after {
      ${theme.focus.absoluteFocus}
    }
  }

  &:hover {
    background: ${theme.gradients.highlightLight1ToHighlightBase};
  }

  &:active {
    background: ${theme.colors.highlightDark1};
  }

  &.fi-button--disabled,
  &[disabled],
  &:disabled {
    text-shadow: 0 1px 1px ${alphaHex(0.5)(theme.colors.blackBase)};
    background: ${theme.gradients.depthLight1ToDepthBase};
    user-select: none;
    cursor: not-allowed;
  }

  &.fi-button--disabled::after {
    border: none;
    box-shadow: none;
  }

  &.fi-button--fullwidth {
    display: block;
    width: 100%;
  }

  ${invertedStyles(theme)}
  ${secondaryStyles(theme)}
  ${secondaryNoBorderStyles(theme)}
  ${linkStyles(theme)}

  & > .fi-button_icon {
    width: 16px;
    height: 16px;
    margin-right: ${theme.spacing.insetM};
    vertical-align: middle;
    transform: translateY(-0.1em);
    &.fi-button_icon--right {
      margin-right: 0;
      margin-left: ${theme.spacing.insetM};
    }
  }
  &.fi-button--disabled > .fi-button_icon {
    cursor: not-allowed;
  }
`;
