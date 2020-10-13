import { css } from 'styled-components';
import { TextInputProps } from '../TextInput/TextInput';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { input, inputContainer, font, focus } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({
    theme,
  }: TokensAndTheme & Omit<TextInputProps, 'labelText' | 'status'>) => css`
    &.fi-search-input {
      ${font({ theme })('bodyText')}
      display: inline-block;
      width: 290px;
    }

    & .fi-search-input {
      &_label {
        display: flex;
        flex-direction: column;
      }

      &_functionality-container {
        position: relative;
      }

      &_input-element-container {
        ${inputContainer({ theme })}
        &:focus-within {
          box-shadow: ${theme.shadows.actionElementBoxShadow};
        }
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        border: 1px solid ${theme.colors.depthLight1};
        border-radius: ${theme.radius.basic};
      }

      &_input {
        ${input({ theme })}
        padding-top: ${theme.spacing.insetS};
        padding-bottom: ${theme.spacing.insetS};
        width: 100%;
        min-width: 65px;
        border: 0;
        min-height: 36px;
        margin-top: 1px;
        margin-bottom: 1px;
        ::placeholder {
          font-style: italic;
        }
      }

      &_button {
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        box-shadow: none;

        &-clear {
          right: 40px;
          height: 20px;
          min-width: 20px;
          margin: 10px;
          fill: ${theme.colors.depthDark1};
          &-icon {
            width: 12px;
            height: 12px;
            fill: ${theme.colors.highlightDark1};
          }
        }

        &-search {
          right: 0px;
          height: 40px;
          width: 40px;
          border-radius: 0 ${theme.radius.basic} ${theme.radius.basic} 0;
          border: 0;
          &-icon {
            width: 18px;
            height: 18px;
            fill: ${theme.colors.depthDark1};
          }
        }
      }
    }

    &.fi-search-input--full-width {
      width: 100%;
    }

    &.fi-search-input--error {
      & .fi-search-input_input-element-container {
        border: 1px solid ${theme.colors.alertBase};
        border-right: 0;
      }
      & .fi-search-input_button-search {
        border: 1px solid ${theme.colors.alertBase};
        border-left: 0;
      }
    }

    &.fi-search-input--not-empty {
      & .fi-search-input_input-element-container {
        width: calc(100% - 40px);
        border-radius: ${theme.radius.basic} 0 0 ${theme.radius.basic};
      }
  
      & .fi-search-input_button {
        ${focus({ theme })}
        &:focus {
          position: absolute;
        }
      }

      & .fi-search-input_button-search {
        background: ${theme.gradients.highlightBaseToHighlightDark1};
        &:hover {
          background: ${theme.gradients.highlightLight1ToHighlightBase};
        }
        &:active {
          background-color: ${theme.colors.highlightDark1};
        }
        & .fi-search-input_button-search-icon {
          fill: ${theme.colors.whiteBase};
        }
      }
    }
  `,
);
