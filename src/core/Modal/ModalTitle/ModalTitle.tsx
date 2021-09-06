import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { hLevels, HtmlSpan } from '../../../reset';
import { Heading, HeadingProps } from '../../Heading/Heading';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalTitle.baseStyles';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../theme';

export interface ModalTitleProps
  extends Omit<HeadingProps, 'className' | 'variant'> {
  /** Children */
  children: ReactNode;
  /** Modal container div class name for custom styling. */
  className?: string;
  /** Variant */
  variant?: hLevels | 'h1hero';
}

interface InternalModalTitleProps extends ModalTitleProps {
  focusTitleOnOpen: boolean;
  titleRef: React.RefObject<HTMLHeadingElement>;
  modalVariant: ModalVariant;
  scrollable: boolean;
  theme: SuomifiTheme;
}

const titleClassName = `${baseClassName}_title`;
const titleClassNames = {
  smallScreen: `${titleClassName}--smallScreen`,
  noScroll: `${titleClassName}--no-scroll`,
  focusWrapper: `${titleClassName}_focus-wrapper`,
};

class BaseModalTitle extends Component<InternalModalTitleProps> {
  state = {
    titleFocusable: true,
  };

  render() {
    const {
      className,
      theme,
      children,
      focusTitleOnOpen,
      titleRef,
      modalVariant,
      scrollable,
      variant = 'h3',
      as = 'h2',
      ...passProps
    } = this.props;

    return (
      <HtmlSpan
        className={classnames(className, titleClassName, {
          [titleClassNames.smallScreen]: modalVariant === 'smallScreen',
          [titleClassNames.noScroll]: scrollable === false,
        })}
      >
        <Heading
          className={titleClassNames.focusWrapper}
          {...(this.state.titleFocusable && focusTitleOnOpen
            ? { tabIndex: 0 }
            : {})}
          onBlur={() => this.setState({ titleFocusable: false })}
          variant={variant}
          ref={titleRef}
          as={as}
          {...passProps}
        >
          {children}
        </Heading>
      </HtmlSpan>
    );
  }
}

const StyledModalTitle = styled(BaseModalTitle)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * ModalTitle
 * Id and smallScreen variant are provided by Modal context and cannot be given as props.
 * Children are wrapped in h2 heading and styled as h3 by default.
 */
export class ModalTitle extends Component<ModalTitleProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <ModalConsumer>
            {({ focusTitleOnOpen, titleRef, variant, scrollable }) => (
              <StyledModalTitle
                focusTitleOnOpen={focusTitleOnOpen}
                {...(titleRef ? { titleRef } : {})}
                modalVariant={variant}
                scrollable={scrollable}
                theme={suomifiTheme}
                {...this.props}
              />
            )}
          </ModalConsumer>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
