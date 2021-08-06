import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { HtmlDiv } from '../../../reset';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../theme';
import {
  ExpanderGroupConsumer,
  ExpanderGroupProviderState,
} from '../ExpanderGroup/ExpanderGroup';
import { baseStyles } from './Expander.baseStyles';

const baseClassName = 'fi-expander';
const openClassName = `${baseClassName}--open`;

export interface ExpanderProviderState {
  /** Callback for communicating ExpanderTitle button event to Expander  */
  onToggleExpander: () => void;
  /** Open state for expander */
  open: boolean;
  /** Id for expander button */
  titleId: string | undefined;
  /** Id for expander content */
  contentId: string | undefined;
}

const defaultProviderValue: ExpanderProviderState = {
  onToggleExpander: () => null,
  open: false,
  titleId: undefined,
  contentId: undefined,
};

const {
  Provider: ExpanderProvider,
  Consumer: ExpanderConsumer,
} = React.createContext(defaultProviderValue);

export interface ExpanderProps {
  /**
   * Children, extend type ExpanderTitleBaseProps or ExpanderContentBaseProps
   * ExpanderProviderState context is used to communicate between title, content and expander
   */
  children: ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Id for expander, must be unique. Duplicate id's break ExpanderGroup functionality.
   * Autogenerated if not provided
   */
  id?: string;
  /** Initial open state
   * @default false
   */
  defaultOpen?: boolean;
  /** Controlled open property */
  open?: boolean;
  /** Event handler to execute when clicked */
  onOpenChange?: (open: boolean) => void;
}

export interface ExpanderTitleBaseProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Expander consumer for open state and toggle open callback */
  consumer: ExpanderProviderState;
}

export interface ExpanderContentBaseProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Expander consumer for open state */
  consumer: ExpanderProviderState;
}

interface BaseExpanderProps extends ExpanderProps {
  id: string;
  consumer: ExpanderGroupProviderState;
}

class BaseExpander extends Component<
  BaseExpanderProps & { theme: SuomifiTheme }
> {
  state: ExpanderState = {
    openState: this.props.defaultOpen || false,
  };

  constructor(props: BaseExpanderProps & { theme: SuomifiTheme }) {
    super(props);
    if (!!props.id) {
      const defaultOpen =
        props.open !== undefined ? props.open : props.defaultOpen || false;
      props.consumer.onExpanderOpenChange(props.id, defaultOpen);
    }
  }

  componentDidUpdate(prevProps: BaseExpanderProps, prevState: ExpanderState) {
    const { consumer, open } = this.props;
    const controlled = open !== undefined;
    const currentState = controlled ? !!open : this.state.openState;
    // update group state when id changes
    if (prevProps.id !== this.props.id) {
      if (!!prevProps.id) {
        consumer.onExpanderOpenChange(prevProps.id, undefined);
      }
      consumer.onExpanderOpenChange(this.props.id, currentState);
    }
    // handle consumer open change event
    if (
      consumer.expanderGroupOpenState !==
      prevProps.consumer?.expanderGroupOpenState
    ) {
      if (
        (!controlled &&
          !!this.state.openState !==
            consumer.expanderGroupOpenState.targetOpenState) ||
        (controlled && open !== consumer.expanderGroupOpenState.targetOpenState)
      ) {
        this.handleOpenChange();
      }
    }
    // handle expander open change event
    if (
      (!controlled && prevState.openState !== this.state.openState) ||
      (controlled && prevProps.open !== open)
    ) {
      if (!!this.props.id) {
        consumer.onExpanderOpenChange(this.props.id, currentState);
      }
    }
  }

  componentWillUnmount() {
    this.props.consumer.onExpanderOpenChange(this.props.id, undefined);
  }

  handleOpenChange = () => {
    const { open, onOpenChange } = this.props;
    const { openState } = this.state;
    const controlled = open !== undefined;
    const newOpenState = controlled ? !!open : !openState;
    if (!controlled) {
      this.setState({ openState: newOpenState });
    }
    if (!!onOpenChange) {
      onOpenChange(newOpenState);
    }
  };

  render() {
    const {
      id,
      open,
      defaultOpen,
      onOpenChange,
      className,
      theme,
      children,
      consumer,
      ...passProps
    } = this.props;
    const openState = open !== undefined ? !!open : this.state.openState;

    return (
      <HtmlDiv
        id={id}
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: !!openState,
        })}
      >
        <ExpanderProvider
          value={{
            open: openState,
            contentId: `${id}_content`,
            titleId: `${id}_title`,
            onToggleExpander: this.handleOpenChange,
          }}
        >
          {children}
        </ExpanderProvider>
      </HtmlDiv>
    );
  }
}

const StyledExpander = styled(BaseExpander)`
  ${({ theme }) => baseStyles(theme)};
`;

interface ExpanderState {
  openState: boolean;
}

/**
 * <i class="semantics" />
 * Hide or show content with always visible title
 */
export class Expander extends Component<ExpanderProps> {
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <ExpanderGroupConsumer>
                {(consumer) => (
                  <StyledExpander
                    theme={suomifiTheme}
                    id={id}
                    {...passProps}
                    consumer={consumer}
                  />
                )}
              </ExpanderGroupConsumer>
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  }
}

export { ExpanderConsumer, ExpanderProvider };
