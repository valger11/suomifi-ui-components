```js
import { Alert, InlineAlert } from 'suomifi-ui-components';

<>
  <Alert closeText="Close" smallScreen>
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </Alert>

  <Alert closeText="Close" labelText="Maintenance notification">
    This is a long alert text. Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Morbi est nulla, rhoncus ac odio at, blandit
    ornare mi. Suspendisse potenti. Vestibulum ante ipsum primis in
    faucibus orci luctus et ultrices posuere cubilia curae;
    Suspendisse efficitur et turpis eget tempor. Nam sed lacus ut
    lorem feugiat tincidunt. Mauris quis nisi placerat, convallis
    turpis nec, auctor massa. Nam ornare tortor id tortor tristique,
    in semper augue fermentum. Nulla at pharetra leo, a ullamcorper
    metus. Donec molestie velit tristique feugiat interdum. Donec
    ultrices efficitur pellentesque. Sed luctus ac metus sed rhoncus.
  </Alert>

  <InlineAlert status="error">
    Something went wrong. Please try again in a moment.
  </InlineAlert>

  <Alert status="error" closeText="Long close text">
    Something went wrong. Please try again in a moment.
  </Alert>

  <Alert status="warning" closeText="Close">
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </Alert>

  <InlineAlert status="warning" labelText="Warning">
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </InlineAlert>

  <InlineAlert labelText="Long label Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at">
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </InlineAlert>
</>;
```
