import React, { Component } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { HtmlSpan } from '../../../reset';
import {
  BaseChipProps,
  baseClassName,
  chipClassNames,
} from '../BaseChip/BaseChip';
import { staticChipBaseStyles } from './StaticChip.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

export interface StaticChipProps extends BaseChipProps {}

class BaseChip extends Component<StaticChipProps> {
  render() {
    const { className, children, disabled = false, ...passProps } = this.props;

    return (
      <HtmlSpan
        className={classnames(baseClassName, className, {
          [chipClassNames.disabled]: !!disabled,
        })}
        {...passProps}
      >
        <HtmlSpan className={chipClassNames.content}>{children}</HtmlSpan>
      </HtmlSpan>
    );
  }
}

const StyledChip = styled(
  ({ theme, ...passProps }: StaticChipProps & SuomifiThemeProp) => (
    <BaseChip {...passProps} />
  ),
)`
  ${({ theme }) => staticChipBaseStyles(theme)}
`;

export class StaticChip extends Component<StaticChipProps> {
  render() {
    const { ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledChip theme={suomifiTheme} {...passProps} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
