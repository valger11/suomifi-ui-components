import React, { Component, ReactNode, Fragment } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuPopover,
  MenuPopoverProps,
} from '@reach/menu-button';
import { positionDefault } from '@reach/popover';
import { PRect } from '@reach/rect';
import { classnamesValue } from '../../../utils/typescript';
import { logger } from '../../../utils/logger';
import { HtmlSpan } from '../../../reset/HtmlSpan/HtmlSpan';
import { Icon } from '../../Icon/Icon';
import {
  baseStyles,
  languageMenuPopoverStyles,
} from './LanguageMenu.baseStyles';

const baseClassName = 'fi-language-menu';
const languageMenuClassNames = {
  item: `${baseClassName}_item`,
  itemLang: `${baseClassName}-language_item`,
  button: `${baseClassName}_button`,
  buttonOpen: `${baseClassName}-language_button_open`,
  buttonLang: `${baseClassName}-language_button`,
  popover: `${baseClassName}_popover`,
  popoverLang: `${baseClassName}-language_popover`,
  iconLang: `${baseClassName}-language_icon`,
};

export interface LanguageMenuItemBaseProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
}

type SupportedMenuLinkComponent = keyof JSX.IntrinsicElements;

interface LanguageMenuLinkPropsWithType {
  type: 'menulink';
  /** Url to direct to */
  href: string;
  /** Item content */
  children: ReactNode;
  className?: string;
  as?: SupportedMenuLinkComponent;
}

export interface LanguageMenuLinkBaseProps
  extends Omit<LanguageMenuLinkPropsWithType, 'type'> {}

export type LanguageMenuPopoverItemsProps =
  | LanguageMenuItemBaseProps
  | LanguageMenuLinkPropsWithType;
type OptionalLanguageMenuPopoverProps = {
  [K in keyof MenuPopoverProps]?: MenuPopoverProps[K];
};

export interface LanguageMenuProps {
  /** Name or content of menubutton */
  name: React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode);
  /** Custom classname to extend or customize */
  className?: string;
  /** Custom classname to extend or customize */
  languageMenuButtonClassName?: string;
  /** Custom classname to apply when menu is open */
  languageMenuOpenButtonClassName?: string;
  /** Properties given to LanguageMenu's popover-component, className etc. */
  languageMenuPopoverProps?: OptionalLanguageMenuPopoverProps;
  languageMenuPopoverComponent?: React.ComponentType<OptionalLanguageMenuPopoverProps>;
  /** Menu items: MenuItem or MenuLink */
  children?:
    | Array<React.ReactElement<LanguageMenuPopoverItemsProps>>
    | null
    | undefined;
}

class BaseLanguageMenu extends Component<LanguageMenuProps> {
  render() {
    const {
      children,
      name,
      className,
      languageMenuButtonClassName: menuButtonClassName,
      languageMenuOpenButtonClassName: menuButtonOpenClassName,
      languageMenuPopoverProps: menuPopoverProps = {},
      languageMenuPopoverComponent: MenuPopoverComponentReplace,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      logger.warn(`Menu '${name}' does not contain items`);
      return null;
    }
    return (
      <HtmlSpan className={classnames(className, baseClassName)}>
        <Menu>
          {({ isOpen }: { isOpen: boolean }) => (
            <Fragment>
              <MenuButton
                {...passProps}
                className={classnames(
                  menuButtonClassName,
                  isOpen && menuButtonOpenClassName,
                )}
              >
                {name}
              </MenuButton>
              {!!MenuPopoverComponentReplace ? (
                <MenuPopoverComponentReplace {...menuPopoverProps}>
                  {children}
                </MenuPopoverComponentReplace>
              ) : (
                <MenuPopover position={positionDefault} {...menuPopoverProps}>
                  <MenuItems>{children}</MenuItems>
                </MenuPopover>
              )}
            </Fragment>
          )}
        </Menu>
      </HtmlSpan>
    );
  }
}
const StyledLanguageMenu = styled((props: LanguageMenuProps) => (
  <BaseLanguageMenu {...props} />
))`
  ${baseStyles}
`;

const LanguageMenuPopoverWithProps = (
  children: ReactNode,
  addClass?: classnamesValue,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<LanguageMenuPopoverItemsProps>) => {
      // Set defaul component-prop/type to be 'a' needed for links
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          as: 'a',
          className: classnames(languageMenuClassNames.item, addClass),
        });
      }
      return child;
    },
  );

const languageName = (name: ReactNode) => (
  <Fragment>
    {name}
    <Icon icon="chevronDown" className={languageMenuClassNames.iconLang} />
  </Fragment>
);

const LanguageMenuPopoverPosition = (
  targetRect: PRect | null,
  popoverRect: PRect | null,
): React.CSSProperties => {
  if (!targetRect || !popoverRect) {
    return {};
  }
  return {
    left: `${targetRect.left - popoverRect.width + targetRect.width}px`,
    // eslint-disable-next-line no-undef
    top: `${targetRect.top + targetRect.height + window.pageYOffset}px`,
    maxWidth: `${Math.max(
      targetRect.width,
      targetRect.width + targetRect.left - 30,
    )}px`,
    minWidth: `${targetRect.width - 2}px`,
  };
};

const StyledMenuPopover = styled(
  ({ children, ...passProps }: MenuPopoverProps) => (
    <MenuPopover {...passProps} position={LanguageMenuPopoverPosition}>
      <MenuItems>{children}</MenuItems>
    </MenuPopover>
  ),
)`
  ${languageMenuPopoverStyles}
`;

/**
 * <i class="semantics" />
 * Use for dropdown menu.
 */
export class LanguageMenu extends Component<LanguageMenuProps> {
  render() {
    const {
      children,
      name,
      className,
      languageMenuPopoverComponent: MenuPopoverComponentProp,
      ...passProps
    } = this.props;
    const languageMenuButtonClassName = classnames(
      languageMenuClassNames.button,
      languageMenuClassNames.buttonLang,
      className,
    );
    const menuPopoverProps = {
      className: classnames(
        languageMenuClassNames.popover,
        languageMenuClassNames.popoverLang,
      ),
    };

    return (
      <Fragment>
        <StyledLanguageMenu
          {...passProps}
          name={languageName(name)}
          languageMenuButtonClassName={languageMenuButtonClassName}
          languageMenuOpenButtonClassName={languageMenuClassNames.buttonOpen}
          languageMenuPopoverProps={menuPopoverProps}
          languageMenuPopoverComponent={
            !!MenuPopoverComponentProp
              ? MenuPopoverComponentProp
              : StyledMenuPopover
          }
        >
          {LanguageMenuPopoverWithProps(
            children,
            languageMenuClassNames.itemLang,
          )}
        </StyledLanguageMenu>
      </Fragment>
    );
  }
}