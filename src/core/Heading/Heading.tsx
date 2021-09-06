import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { asPropType } from '../../utils/typescript';
import { logger } from '../../utils/log';
import { ColorProp, SuomifiTheme, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Heading.baseStyles';
import { HtmlH, HtmlHProps, hLevels } from '../../reset';

const baseClassName = 'fi-heading';
const smallScreenClassName = `${baseClassName}--small-screen`;
type styleVariants = hLevels | 'h1hero';

export interface HeadingProps extends HtmlHProps {
  /**
   * Heading level to assign semantic element and styling.
   * @default h1
   */
  variant: styleVariants;
  /** Change font to smaller screen size and style */
  smallScreen?: boolean;
  /** Change color for text from theme colors */
  color?: ColorProp;
  /** Custom class name for styling */
  className?: string;
  /** Render the heading as another element e.g. h3 as h2. Will override semantics derived from variant prop but keep the variant styles. */
  as?: asPropType;
}

interface InternalHeadingProps extends HeadingProps {
  forwardedRef?: React.RefObject<HTMLHeadingElement>;
  asProp?: asPropType;
  theme: SuomifiTheme;
}

const getSemanticVariant = (variant: styleVariants) => {
  if (variant === 'h1hero') return 'h1';
  return variant;
};

const StyledHeading = styled(
  ({
    smallScreen,
    className,
    theme,
    variant,
    color,
    asProp,
    ...passProps
  }: InternalHeadingProps) => (
    <HtmlH
      {...passProps}
      className={classnames(
        baseClassName,
        className,
        [`${baseClassName}--${variant}`],
        {
          [smallScreenClassName]: smallScreen,
        },
      )}
      as={!!asProp ? asProp : getSemanticVariant(variant)}
    />
  ),
)`
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Used displaying headings with correct fonts
 */
export const Heading = forwardRef(
  (props: HeadingProps, ref: React.RefObject<HTMLHeadingElement>) => {
    const { as, variant, ...passProps } = props;
    if (!variant) {
      logger.warn(
        `Does not contain heading level (variant): ${passProps.children}`,
      );
      return null;
    }
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledHeading
            theme={suomifiTheme}
            forwardedRef={ref}
            asProp={as}
            {...passProps}
            variant={variant}
          />
        )}
      </SuomifiThemeConsumer>
    );
  },
);
