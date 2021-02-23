import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Checkbox.baseStyles';
import { getConditionalAriaProp } from '../../../utils/aria';
import { HtmlLabel, HtmlDiv, HtmlInputWithRef } from '../../../reset';
import { logger } from '../../../utils/logger';
import { Icon } from '../../Icon/Icon';
import { AutoId } from '../../../utils/AutoId';
import { StatusText } from '../StatusText/StatusText';
import { InputStatus } from '../types';
import { HintText } from '../HintText/HintText';

const baseClassName = 'fi-checkbox';

const checkboxClassNames = {
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  label: `${baseClassName}_label`,
  statusText: `${baseClassName}_status`,
  hintText: `${baseClassName}_hintText`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  checked: `${baseClassName}--checked`,
  large: `${baseClassName}--large`,
};

const iconBaseClassName = 'fi-checkbox_icon';

const iconClassnames = {
  disabled: `${iconBaseClassName}--disabled`,
  checked: `${iconBaseClassName}--checked`,
  error: `${iconBaseClassName}--error`,
};

type CheckboxStatus = Exclude<InputStatus, 'success'>;

interface InternalCheckboxProps {
  /** Controlled checked-state - user actions use onClick to change  */
  checked?: boolean;
  /** Default status of Checkbox when not using controlled 'checked' state
   * @default false
   */
  defaultChecked?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Checkbox. Value won't be included when submitting */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: ({ checkboxState }: { checkboxState: boolean }) => void;
  /**
   * Label element content
   */
  children?: ReactNode;
  /**
   * Variant of the Checkbox
   * @default small
   */
  variant?: 'small' | 'large';
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: CheckboxStatus;
  /**
   * Status text to be displayed in the status text element. Will not be displayed when element is disabled.
   */
  statusText?: string;
  /**
   * Hint text to be displayed under the label.
   */
  hintText?: string;
  /**
   * aria-label for the HTML input-element,
   * alternatively you can define aria-labelledby with label-element id
   */
  'aria-label'?: string;
  /**
   * aria-labelledby for the HTML input-element,
   * alternatively you can define aria-label
   */
  'aria-labelledby'?: string;
  /**
   * aria-describedby for the HTML input-element,
   */
  'aria-describedby'?: string;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Name */
  name?: string;
  /** Value */
  value?: string;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLInputElement>;
}

export interface CheckboxProps extends InternalCheckboxProps {
  /** Ref object to be passed */
  ref?: React.RefObject<HTMLInputElement>;
}

class BaseCheckbox extends Component<CheckboxProps & InnerRef> {
  state = {
    checkedState: !!this.props.checked || !!this.props.defaultChecked,
  };

  static getDerivedStateFromProps(
    nextProps: CheckboxProps,
    prevState: { checkedState: boolean },
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.checkedState) {
      return { checkedState: checked };
    }
    return null;
  }

  handleClick = () => {
    const { onClick, checked } = this.props;
    const { checkedState } = this.state;
    if (checked === undefined) {
      this.setState({ checkedState: !checkedState });
    }
    if (!!onClick) {
      onClick({ checkboxState: !checkedState });
    }
  };

  render() {
    const {
      id,
      className,
      disabled = false,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      children,
      checked: dismissChecked,
      defaultChecked: dismissDefaultChecked,
      onClick: dismissOnClick,
      hintText,
      status,
      statusText,
      name,
      value,
      forwardedRef,
      onClick,
      variant,
      ...passProps
    } = this.props;

    const { checkedState } = this.state;

    if (!children) {
      logger.error(
        'Checkbox component should have a label or a child element that acts as one. Add label content or a child element.',
      );
    }

    if (
      ('name' in this.props && (typeof name !== 'string' || name === '')) ||
      ('value' in this.props && (typeof value !== 'string' || value === ''))
    ) {
      logger.warn(
        'Name and value props should have non-empty values if provided.',
      );
    }

    const statusTextId = !!statusText ? `${id}-statusText` : undefined;
    const hintTextId = !!hintText ? `${id}-hintText` : undefined;

    const CheckedIcon = () => (
      <Icon
        icon="check"
        className={classnames(iconBaseClassName, {
          [iconClassnames.checked]: checkedState && !disabled,
          [iconClassnames.error]: status === 'error' && !disabled,
          [iconClassnames.disabled]: !!disabled,
        })}
      />
    );

    return (
      <HtmlDiv
        className={classnames(
          checkboxClassNames.container,
          className,
          baseClassName,
          {
            [checkboxClassNames.error]: status === 'error' && !disabled,
            [checkboxClassNames.checked]: checkedState && !disabled,
            [checkboxClassNames.large]: variant === 'large',
            [checkboxClassNames.disabled]: !!disabled,
          },
        )}
      >
        <HtmlInputWithRef
          type="checkbox"
          disabled={disabled}
          id={id}
          {...getConditionalAriaProp('aria-label', [ariaLabel])}
          {...getConditionalAriaProp('aria-labelledby', [ariaLabelledBy])}
          {...getConditionalAriaProp('aria-describedby', [
            statusTextId,
            hintTextId,
            ariaDescribedBy,
          ])}
          aria-invalid={status === 'error'}
          checked={!!checkedState}
          className={checkboxClassNames.input}
          onChange={this.handleClick}
          name={name}
          forwardedRef={forwardedRef}
          {...(value ? { value } : {})}
        />
        <HtmlLabel
          htmlFor={id}
          className={checkboxClassNames.label}
          {...passProps}
        >
          {!!checkedState && <CheckedIcon />}
          {children}
        </HtmlLabel>
        <HintText id={hintTextId}>{hintText}</HintText>
        <StatusText id={statusTextId} status={status}>
          {statusText}
        </StatusText>
      </HtmlDiv>
    );
  }
}

const StyledCheckbox = styled(
  ({ ...passProps }: InternalCheckboxProps & InnerRef) => (
    <BaseCheckbox {...passProps} />
  ),
)`
  ${baseStyles}
`;

export const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref: React.RefObject<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <AutoId id={propId}>
        {(id) => <StyledCheckbox id={id} forwardedRef={ref} {...passProps} />}
      </AutoId>
    );
  },
);
