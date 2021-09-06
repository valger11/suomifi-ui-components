import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { ExternalLink } from './ExternalLink';

const TestExternalLink = (
  <ExternalLink
    href="/"
    data-testid="test-link"
    labelNewWindow="Opens in a new window"
  >
    Hey this is test
  </ExternalLink>
);

test('calling render with the same component on the same container does not remount', () => {
  const LinkRendered = render(TestExternalLink);
  const { getByTestId, container } = LinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe(
    'Hey this is testOpens in a new window',
  );
});

test('should not have basic accessibility issues', axeTest(TestExternalLink));
