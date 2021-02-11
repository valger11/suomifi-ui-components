import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { iconBaseStyles } from '../Icon/Icon.baseStyles';
import {
  SuomifiStaticIcon,
  SuomifiStaticIconInterface,
  SuomifiComponentIconInterface,
  SuomifiComponentIcon,
} from 'suomifi-icons';
import { ariaLabelOrHidden, ariaFocusableNoLabel } from '../../utils/aria';
import { IconBaseProps, iconLogger } from '../Icon/Icon';
export { IllustrativeIconKeys, DoctypeIconKeys } from 'suomifi-icons';

export interface StaticIconProps
  extends IconBaseProps,
    SuomifiStaticIconInterface {
  highlightColor?: string;
}

const StyledSuomifiStaticIcon = styled(
  ({
    ariaLabel,
    mousePointer,
    highlightColor,
    ...passProps
  }: StaticIconProps) => (
    <SuomifiStaticIcon
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
    />
  ),
)`
  ${(props) => iconBaseStyles(props)}
`;

/**
 * Static icon-component
 */
export class StaticIcon extends Component<StaticIconProps> {
  render() {
    const {
      icon,
      tokens,
      highlightColor,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    const { className, ariaLabel } = this.props;

    if (icon !== undefined) {
      return (
        <StyledSuomifiStaticIcon
          {...passProps}
          {...(!!highlightColor
            ? { highlightColor }
            : { highlightColor: tokens.colors.accentBase })}
          icon={icon}
        />
      );
    }

    iconLogger(ariaLabel, className);

    return;
  }
}

export interface ComponentIconProps
  extends IconBaseProps,
    SuomifiComponentIconInterface {}

const StyledSuomifiComponentIcon = styled(
  ({ ariaLabel, mousePointer, ...passProps }: ComponentIconProps) => (
    <SuomifiComponentIcon
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
    />
  ),
)`
  ${(props) => iconBaseStyles(props)}
`;

export class ComponentIcon extends Component<ComponentIconProps> {
  render() {
    const { icon, tokens, ...passProps } = withSuomifiDefaultProps(this.props);
    const { className, ariaLabel } = this.props;

    if (icon !== undefined) {
      return <StyledSuomifiComponentIcon {...passProps} icon={icon} />;
    }

    iconLogger(ariaLabel, className);

    return;
  }
}
