import React, { ChangeEvent, Component, createRef, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { getConditionalAriaProp } from '../../../utils/aria';
import { Debounce } from '../../utils/Debounce/Debounce';
import {
  HtmlInput,
  HtmlInputProps,
  HtmlSpan,
  HtmlDiv,
  HtmlDivProps,
  HtmlButton,
  HtmlButtonProps,
} from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { StatusText } from '../StatusText/StatusText';
import { LabelText, LabelMode } from '../LabelText/LabelText';
import { Icon } from '../../Icon/Icon';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './SearchInput.baseStyles';

type SearchInputValue = string | number | undefined;

type SearchInputStatus = Exclude<InputStatus, 'success'>;

export interface SearchInputProps
  extends StatusTextCommonProps,
    Omit<
      HtmlInputProps,
      | 'type'
      | 'disabled'
      | 'onChange'
      | 'children'
      | 'onClick'
      | 'value'
      | 'defaultValue'
    > {
  /** SearchInput container div class name for custom styling. */
  className?: string;
  /** SearchInput wrapping div element props */
  wrapperProps?: Omit<HtmlDivProps, 'className'>;
  /** Label text */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Clear button label for screen readers */
  clearButtonLabel: string;
  /** Search button label for screen readers */
  searchButtonLabel: string;
  /** SearchButtonProps */
  searchButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'tabIndex'>;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: SearchInputStatus;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Controlled value */
  value?: SearchInputValue;
  /** Default value */
  defaultValue?: SearchInputValue;
  /** Callback for input text change */
  onChange?: (value: SearchInputValue) => void;
  /** Callback for onBlur event */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Callback for search button click */
  onSearch?: (value: SearchInputValue) => void;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
}

const baseClassName = 'fi-search-input';
const searchInputClassNames = {
  fullWidth: `${baseClassName}--full-width`,
  error: `${baseClassName}--error`,
  notEmpty: `${baseClassName}--not-empty`,
  styleWrapper: `${baseClassName}_wrapper`,
  inputElement: `${baseClassName}_input`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  functionalityContainer: `${baseClassName}_functionality-container`,
  button: `${baseClassName}_button`,
  searchButton: `${baseClassName}_button-search`,
  searchIcon: `${baseClassName}_button-search-icon`,
  clearButton: `${baseClassName}_button-clear`,
  clearIcon: `${baseClassName}_button-clear-icon`,
};

interface SearchInputState {
  value: SearchInputValue;
}

class BaseSearchInput extends Component<SearchInputProps & SuomifiThemeProp> {
  state: SearchInputState = {
    value: this.props.value || this.props.defaultValue || '',
  };

  private inputRef = createRef<HTMLInputElement>();

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
      clearButtonLabel,
      searchButtonLabel,
      searchButtonProps,
      wrapperProps,
      onChange: propOnChange,
      onSearch: propOnSearch,
      children,
      status,
      statusText,
      visualPlaceholder,
      id,
      fullWidth,
      debounce,
      theme,
      'aria-describedby': ariaDescribedBy,
      statusTextAriaLiveMode = 'assertive',
      ...passProps
    } = this.props;

    const statusTextId = `${id}-statusText`;

    const conditionalSetState = (newValue: SearchInputValue) => {
      if (!('value' in this.props)) {
        this.setState({ value: newValue });
      }
    };

    const onSearch = () => {
      if (!!propOnSearch) {
        propOnSearch(this.state.value);
      }
    };

    const onClear = () => {
      conditionalSetState('');
      if (propOnChange) {
        propOnChange('');
      }
      setTimeout(() => {
        if (this.inputRef.current) {
          this.inputRef.current.focus();
        }
      }, 100);
    };

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!!this.state.value && event?.key === 'Enter') {
        onSearch();
      }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event?.key === 'Escape') {
        event.preventDefault();
      }
    };

    const searchButtonDerivedProps = {
      ...searchButtonProps,
      className: classnames(
        searchButtonProps?.className,
        searchInputClassNames.button,
        searchInputClassNames.searchButton,
      ),
      ...(!!this.state.value
        ? { onClick: onSearch }
        : { tabIndex: -1, 'aria-hidden': true }),
    };
    const clearButtonProps = {
      className: classnames(
        searchInputClassNames.button,
        searchInputClassNames.clearButton,
      ),
      ...(!!this.state.value
        ? { onClick: onClear }
        : { tabIndex: -1, 'aria-hidden': true }),
    };

    return (
      <HtmlDiv
        {...wrapperProps}
        className={classnames(className, baseClassName, {
          [searchInputClassNames.error]: status === 'error',
          [searchInputClassNames.notEmpty]: !!this.state.value,
          [searchInputClassNames.fullWidth]: fullWidth,
        })}
      >
        <HtmlSpan className={searchInputClassNames.styleWrapper}>
          <LabelText htmlFor={id} labelMode={labelMode} asProp="label">
            {labelText}
          </LabelText>
          <Debounce waitFor={debounce}>
            {(debouncer: Function, cancelDebounce: Function) => (
              <HtmlDiv className={searchInputClassNames.functionalityContainer}>
                <HtmlDiv
                  className={searchInputClassNames.inputElementContainer}
                >
                  <HtmlInput
                    {...passProps}
                    {...getConditionalAriaProp('aria-describedby', [
                      !!statusText ? statusTextId : undefined,
                      ariaDescribedBy,
                    ])}
                    forwardedRef={this.inputRef}
                    aria-invalid={status === 'error'}
                    id={id}
                    className={searchInputClassNames.inputElement}
                    type="search"
                    role="searchbox"
                    value={this.state.value}
                    placeholder={visualPlaceholder}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const eventValue = event.currentTarget.value;
                      conditionalSetState(eventValue);
                      if (propOnChange) {
                        debouncer(propOnChange, eventValue);
                      }
                    }}
                    onKeyPress={onKeyPress}
                    onKeyDown={onKeyDown}
                  />
                </HtmlDiv>
                <HtmlButton
                  {...clearButtonProps}
                  onClick={() => {
                    onClear();
                    cancelDebounce();
                  }}
                >
                  <VisuallyHidden>{clearButtonLabel}</VisuallyHidden>
                  <Icon
                    aria-hidden={true}
                    icon="close"
                    className={searchInputClassNames.clearIcon}
                  />
                </HtmlButton>
                <HtmlButton {...searchButtonDerivedProps}>
                  <VisuallyHidden>{searchButtonLabel}</VisuallyHidden>
                  <Icon
                    aria-hidden={true}
                    icon="search"
                    className={searchInputClassNames.searchIcon}
                  />
                </HtmlButton>
              </HtmlDiv>
            )}
          </Debounce>
          <StatusText
            id={statusTextId}
            status={status}
            ariaLiveMode={statusTextAriaLiveMode}
          >
            {statusText}
          </StatusText>
        </HtmlSpan>
      </HtmlDiv>
    );
  }
}

const StyledSearchInput = styled(BaseSearchInput)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting search text.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export class SearchInput extends Component<SearchInputProps> {
  render() {
    const { id: propId, ...passProps } = this.props;

    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledSearchInput theme={suomifiTheme} id={id} {...passProps} />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
