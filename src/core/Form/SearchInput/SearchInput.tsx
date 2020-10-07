import React, { ChangeEvent, Component, ReactNode, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import {
  HtmlLabel,
  HtmlLabelProps,
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
} from '../../../reset';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';
import {
  Paragraph,
  ParagraphProps,
} from '../../../components/Paragraph/Paragraph';
import { StatusText } from '../StatusText/StatusText';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { baseStyles } from './SearchInput.baseStyles';
import { baseStyles as inputBaseStyles } from '../TextInput/TextInput.baseStyles';
import { Icon } from '../../Icon/Icon';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';
import { idGenerator } from '../../../utils/uuid';

export interface TextInputLabelProps extends HtmlLabelProps {}

type Label = 'hidden' | 'visible';

type StateValue = string | number | string[] | undefined;

type SearchInputStatus = 'default' | 'error';

export interface SearchInputProps
  extends Omit<HtmlInputProps, 'type' | 'disabled' | 'onChange'>,
    TokensProp {
  /** TextInput container div class name for custom styling. */
  className?: string;
  /** TextInput container div props */
  inputContainerProps?: Omit<HtmlDivProps, 'className'>;
  /** Pass custom props to label container */
  labelProps?: TextInputLabelProps;
  /** Pass custom props to Label text element */
  labelTextProps?: ParagraphProps;
  /** Label */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: Label;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Clear button text for screen readers */
  clearText: string;
  /** Search button text for screen readers */
  searchText: string;
  /** A custom element to be passed to the component. Will be rendered after the input */
  children?: ReactNode;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * 'default' | 'error' | 'success'
   * @default default
   */
  status?: SearchInputStatus;
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Callback for click event */
  onClick?: () => void;
  /** Callback for input text change */
  onChange?: (value: StateValue) => void;
  /** Callback for onBlur event */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Callback for search button click */
  onSearch?: (value: StateValue) => void;
}

const baseClassName = 'fi-search-input';
const searchInputClassNames = {
  label: `${baseClassName}_label`,
  inputElement: `${baseClassName}_input`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputFocusWrapper: `${baseClassName}_input-focus-wrapper`,
  statusText: `${baseClassName}_statusText`,
  statusTextContainer: `${baseClassName}_statusText_container`,
  hintText: `${baseClassName}_hintText`,
  searchButton: `${baseClassName}_button-search`,
  searchButtonEnabled: `${baseClassName}_button-search-enabled`,
  clearButton: `${baseClassName}_button-clear`,
  clearIcon: `${baseClassName}_button-clear-icon`,
  searchIcon: `${baseClassName}_button-search-icon`,
  labelParagraph: `${baseClassName}_label-p`,
  error: `${baseClassName}--error`,
};

interface SearchInputState {
  value: string | number | string[] | undefined;
}

class BaseSearchInput extends Component<SearchInputProps> {
  state: SearchInputState = {
    value: this.props.value || this.props.defaultValue || '',
  };

  static getDerivedStateFromProps(
    nextProps: SearchInputProps,
    prevState: SearchInputState,
  ) {
    const { value } = nextProps;
    if ('value' in nextProps && value !== prevState.value) {
      return { value };
    }
    return null;
  }

  render() {
    const {
      value,
      defaultValue,
      className,
      labelText,
      labelMode,
      labelProps,
      labelTextProps = { className: undefined },
      clearText,
      searchText,
      inputContainerProps,
      onChange: propOnChange,
      onSearch: propOnSearch,
      children,
      status,
      statusText,
      hintText,
      visualPlaceholder,
      id: propId,
      fullWidth,
      ...passProps
    } = this.props;

    const conditionalSetState = (newValue: StateValue) => {
      if (!('value' in this.props)) {
        this.setState({ value: newValue });
      }
      if (propOnChange) {
        propOnChange(newValue);
      }
    };

    const onSearch = () => {
      if (!!propOnSearch) {
        propOnSearch(this.state.value);
      }
    };

    const hideLabel = labelMode === 'hidden';
    const generatedStatusTextId = `${idGenerator(propId)}-statusText`;
    const generatedHintTextId = `${idGenerator(propId)}-hintText`;

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(className, baseClassName, {
          [searchInputClassNames.error]: status === 'error',
        })}
      >
        <HtmlLabel
          {...labelProps}
          className={classnames(
            searchInputClassNames.label,
            labelProps?.className,
          )}
        >
          {hideLabel ? (
            <VisuallyHidden>{labelText}</VisuallyHidden>
          ) : (
            <Paragraph
              {...labelTextProps}
              className={classnames(
                labelTextProps.className,
                searchInputClassNames.labelParagraph,
              )}
            >
              {labelText}
            </Paragraph>
          )}
          {hintText && (
            <Paragraph
              className={searchInputClassNames.hintText}
              id={generatedHintTextId}
            >
              {hintText}
            </Paragraph>
          )}
          <HtmlDiv className={searchInputClassNames.statusTextContainer}>
            <HtmlDiv className={searchInputClassNames.inputElementContainer}>
              <HtmlDiv className={searchInputClassNames.inputFocusWrapper}>
                <HtmlInput
                  {...passProps}
                  type="text"
                  value={this.state.value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    conditionalSetState(event.currentTarget.value);
                  }}
                  id={propId}
                  className={searchInputClassNames.inputElement}
                  placeholder={visualPlaceholder}
                  {...{ 'aria-invalid': status === 'error' }}
                />
              </HtmlDiv>
              {!!this.state.value && (
                <HtmlDiv
                  onClick={() => conditionalSetState('')}
                  className={classnames(searchInputClassNames.clearButton)}
                  role="button"
                  tabIndex={0}
                >
                  <Icon
                    ariaLabel={clearText}
                    icon="close"
                    className={searchInputClassNames.clearIcon}
                  />
                </HtmlDiv>
              )}
              <HtmlDiv
                role="button"
                {...(!!this.state.value
                  ? {
                      tabIndex: 0,
                      onClick: onSearch,
                    }
                  : {})}
                className={classnames(searchInputClassNames.searchButton, {
                  [searchInputClassNames.searchButtonEnabled]: !!this.state
                    .value,
                })}
              >
                <Icon
                  icon="search"
                  ariaLabel={searchText}
                  className={searchInputClassNames.searchIcon}
                />
              </HtmlDiv>
            </HtmlDiv>
            <StatusText id={generatedStatusTextId} status={status}>
              {statusText}
            </StatusText>
          </HtmlDiv>
        </HtmlLabel>
      </HtmlDiv>
    );
  }
}

const StyledTextInput = styled(
  ({ tokens, ...passProps }: SearchInputProps & InternalTokensProp) => {
    return <BaseSearchInput {...passProps} />;
  },
)`
  ${(props) => inputBaseStyles(props)}
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting search text.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export class SearchInput extends Component<SearchInputProps> {
  render() {
    return <StyledTextInput {...withSuomifiDefaultProps(this.props)} />;
  }
}
