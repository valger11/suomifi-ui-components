import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlButton,
  HtmlButtonProps,
  HtmlDivProps,
  HtmlSpan,
} from '../../../reset';
import { Icon } from '../../Icon/Icon';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../theme';
import { ExpanderConsumer, ExpanderTitleBaseProps } from '../Expander/Expander';
import { expanderTitleBaseStyles } from './ExpanderTitle.baseStyles';

const baseClassName = 'fi-expander_title';
const titleOpenClassName = `${baseClassName}--open`;
const titleContentClassName = `${baseClassName}-content`;
const titleButtonClassName = `${baseClassName}-button`;
const iconClassName = `${baseClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;

export interface ExpanderTitleProps extends Omit<HtmlDivProps, 'className'> {
  /** Custom classname to extend or customize */
  className?: string;
  /** Title for Expander */
  children?: ReactNode;
  /** Screen reader action label for collapsed expander toggle button. E.g."open expander". */
  ariaOpenText: string;
  /** Screen reader action label for expanded expander toggle button. E.g."close expander". */
  ariaCloseText: string;
  /** Expander title id for screen reader reference in expander toggle button. */
  toggleButtonAriaDescribedBy: string;
  /** Properties for title open/close toggle button */
  toggleButtonProps?: Omit<
    HtmlButtonProps,
    | 'onClick'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onKeyPress'
    | 'onKeyUp'
    | 'onKeyDown'
  >;
}

interface InternalExpanderTitleProps
  extends ExpanderTitleProps,
    ExpanderTitleBaseProps {
  theme: SuomifiTheme;
}

class BaseExpanderTitle extends Component<InternalExpanderTitleProps> {
  render() {
    const {
      ariaCloseText,
      ariaOpenText,
      children,
      className,
      theme,
      toggleButtonAriaDescribedBy,
      toggleButtonProps,
      consumer,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [titleOpenClassName]: !!consumer.open,
        })}
      >
        <HtmlSpan className={titleContentClassName} id={consumer.titleId}>
          {children}
        </HtmlSpan>
        <HtmlButton
          {...toggleButtonProps}
          onClick={consumer.onToggleExpander}
          aria-expanded={!!consumer.open}
          className={titleButtonClassName}
          aria-controls={consumer.contentId}
          aria-describedby={toggleButtonAriaDescribedBy}
        >
          <VisuallyHidden>
            {!!consumer.open ? ariaCloseText : ariaOpenText}
          </VisuallyHidden>
          <Icon
            icon="chevronDown"
            className={classnames(iconClassName, {
              [iconOpenClassName]: consumer.open,
            })}
          />
        </HtmlButton>
      </HtmlDiv>
    );
  }
}

const StyledExpanderTitle = styled(BaseExpanderTitle)`
  ${({ theme }) => expanderTitleBaseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Expander title for focusable content and toggle button for content visiblity
 */
export class ExpanderTitle extends Component<ExpanderTitleProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <ExpanderConsumer>
            {(consumer) => (
              <StyledExpanderTitle
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
