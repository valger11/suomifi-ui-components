import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-label-text {
    & .fi-label-text_label-span {
      ${font(theme)('actionElementInnerTextBold')};
      display: block;
      margin-bottom: ${theme.spacing.xs};
      color: ${theme.colors.blackBase};

      & .fi-label-text_optionalText {
        ${theme.typography.bodyTextSmall};
      }
    }
  }
`;
