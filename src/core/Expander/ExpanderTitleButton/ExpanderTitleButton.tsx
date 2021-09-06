import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlButton, HtmlButtonProps, HtmlSpan } from '../../../reset';
import { Icon } from '../../Icon/Icon';
import { SuomifiThemeConsumer, SuomifiTheme } from '../../theme';
import { ExpanderConsumer, ExpanderTitleBaseProps } from '../Expander/Expander';
import { expanderTitleButtonBaseStyles } from './ExpanderTitleButton.baseStyles';

const baseClassName = 'fi-expander_title-button';
const titleOpenClassName = `${baseClassName}--open`;
const titleButtonClassName = `${baseClassName}_button`;
const iconClassName = `${baseClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;

export interface ExpanderTitleButtonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Title for Expander */
  children?: ReactNode;
  /** Wrap the title button inside a heading tag */
  asHeading?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
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

interface InternalExpanderTitleButtonProps
  extends ExpanderTitleButtonProps,
    ExpanderTitleBaseProps {
  theme: SuomifiTheme;
}

class BaseExpanderTitleButton extends Component<InternalExpanderTitleButtonProps> {
  render() {
    const {
      asHeading,
      children,
      className,
      theme,
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
        <HtmlSpan {...(!!asHeading ? { as: asHeading } : {})}>
          <HtmlButton
            {...toggleButtonProps}
            onClick={consumer.onToggleExpander}
            aria-expanded={!!consumer.open}
            className={titleButtonClassName}
            aria-controls={consumer.contentId}
          >
            <HtmlSpan id={consumer.titleId}>{children}</HtmlSpan>
            <Icon
              icon="chevronDown"
              className={classnames(iconClassName, {
                [iconOpenClassName]: consumer.open,
              })}
            />
          </HtmlButton>
        </HtmlSpan>
      </HtmlDiv>
    );
  }
}

const StyledExpanderTitle = styled(BaseExpanderTitleButton)`
  ${({ theme }) => expanderTitleButtonBaseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Expander title button for static title content and toggle for content visiblity
 */
export class ExpanderTitleButton extends Component<ExpanderTitleButtonProps> {
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
