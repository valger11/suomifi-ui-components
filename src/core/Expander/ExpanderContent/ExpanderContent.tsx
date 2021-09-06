import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { getConditionalAriaProp } from '../../../utils/aria';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../theme';
import {
  ExpanderConsumer,
  ExpanderContentBaseProps,
} from '../Expander/Expander';
import { baseStyles } from './ExpanderContent.baseStyles';

const baseClassName = 'fi-expander';
const contentBaseClassName = `${baseClassName}_content`;
const contentOpenClassName = `${contentBaseClassName}--open`;
const noPaddingClassName = `${contentBaseClassName}--no-padding`;

export interface ExpanderContentProps extends Omit<HtmlDivProps, 'id'> {
  /** Content for expander */
  children: ReactNode;
  /**
   * Remove padding from expandable content area (for background usage with padding in given container etc.)
   * @default false
   */
  noPadding?: boolean;
}

interface InternalExpanderContentProps
  extends ExpanderContentBaseProps,
    ExpanderContentProps {
  theme: SuomifiTheme;
}

class BaseExpanderContent extends Component<InternalExpanderContentProps> {
  render() {
    const {
      children,
      title,
      className,
      theme,
      noPadding,
      consumer,
      'aria-labelledby': ariaLabelledBy,
      ...passProps
    } = this.props;
    return (
      <HtmlDiv
        role="region"
        {...passProps}
        id={consumer.contentId}
        {...getConditionalAriaProp('aria-labelledby', [
          consumer.titleId,
          ariaLabelledBy,
        ])}
        className={classnames(className, contentBaseClassName, {
          [contentOpenClassName]: !!consumer.open,
          [noPaddingClassName]: !!noPadding,
        })}
        aria-hidden={!consumer.open}
        key={String(consumer.open)}
      >
        {children}
      </HtmlDiv>
    );
  }
}

const StyledExpanderContent = styled(BaseExpanderContent)`
  ${({ theme }) => baseStyles(theme)};
`;

/**
 * <i class="semantics" />
 * Expander content wrapper, controlled by expander
 */
export class ExpanderContent extends Component<ExpanderContentProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <ExpanderConsumer>
            {(consumer) => (
              <StyledExpanderContent
                theme={suomifiTheme}
                consumer={consumer}
                {...this.props}
              />
            )}
          </ExpanderConsumer>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
