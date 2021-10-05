import React from 'react';
import { default as styled } from 'styled-components';
import { Link, LinkProps } from '../../Link';
import { Icon } from '../../Icon/Icon';
import { HtmlSpan } from '../../../reset';
import classnames from 'classnames';
import { baseStyles } from './BreadcrumbLink.baseStyles';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';

const baseClassName = 'fi-breadcrumb-link';
const breadcrumbClassNames = {
  link: `${baseClassName}_link`,
  current: `${baseClassName}_link--current`,
  icon: `${baseClassName}_icon`,
};

export interface BreadcrumbLinkProps extends Omit<LinkProps, 'href'> {
  /** Indicating the link is the current page */
  current?: boolean;
  /** url for the link */
  href?: string;
}

const BaseBreadcrumbLink = (props: BreadcrumbLinkProps & SuomifiThemeProp) => {
  const {
    current,
    children,
    className,
    theme,
    href = '',
    ...passProps
  } = props;
  return (
    <HtmlSpan className={classnames(className, baseClassName)}>
      {!current ? (
        <>
          <Link
            {...passProps}
            className={breadcrumbClassNames.link}
            href={href}
          >
            {children}
          </Link>
          <Icon icon="linkBreadcrumb" className={breadcrumbClassNames.icon} />
        </>
      ) : (
        <HtmlSpan
          className={classnames(
            breadcrumbClassNames.link,
            breadcrumbClassNames.current,
          )}
          aria-current="location"
        >
          {children}
        </HtmlSpan>
      )}
    </HtmlSpan>
  );
};

const StyledBreadcrumbLink = styled(BaseBreadcrumbLink)`
  ${({ theme }) => baseStyles(theme)}
`;

export const BreadcrumbLink = (props: BreadcrumbLinkProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledBreadcrumbLink theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);
