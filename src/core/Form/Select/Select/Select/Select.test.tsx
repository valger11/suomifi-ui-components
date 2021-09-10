import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { axeTest } from '../../../../../utils/test/axe';
import { Select, SelectData } from './Select';

const tools = [
  {
    name: 'Jackhammer',
    price: 230,
    tax: false,
    labelText: 'Jackhammer',
    uniqueItemId: 'jh2435626',
  },
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    uniqueItemId: 'h9823523',
  },
  {
    name: 'Sledgehammer',
    price: 36,
    tax: false,
    labelText: 'Sledgehammer',
    uniqueItemId: 'sh908293482',
  },
  {
    name: 'Spade',
    price: 50,
    tax: true,
    labelText: 'Spade',
    uniqueItemId: 's82502335',
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true,
    uniqueItemId: 'ps9081231',
  },
  {
    name: 'Shovel',
    price: 115,
    tax: true,
    labelText: 'Shovel',
    uniqueItemId: 's05111511',
  },
  {
    name: 'Iron stick',
    price: 85,
    tax: false,
    labelText: 'Iron stick',
    uniqueItemId: 'is3451261',
  },
  {
    name: 'Rake',
    price: 50,
    tax: true,
    labelText: 'Rake',
    uniqueItemId: 'r09282626',
  },
  {
    name: 'Motorsaw',
    price: 450,
    tax: false,
    labelText: 'Motorsaw',
    disabled: true,
    uniqueItemId: 'ms6126266',
  },
];

const defaultSelectedTool = {
  name: 'Hammer',
  price: 15,
  tax: true,
  labelText: 'Hammer',
  uniqueItemId: 'h9823523',
};

const BasicSelect = (
  <Select
    labelText="Select"
    clearButtonLabel="Clear selection"
    items={tools}
    visualPlaceholder="Choose your tool(s)"
    noItemsText="No items"
    defaultSelectedItem={defaultSelectedTool}
    ariaOptionsAvailableText="Options available"
  />
);

it('should not have basic accessibility issues', async () => {
  await act(async () => {
    axeTest(BasicSelect);
  });
});

it('has matching snapshot', () => {
  const { container } = render(BasicSelect);
  expect(container.firstChild).toMatchSnapshot();
});

describe('Controlled', () => {
  it('has the controlled items as selected', async () => {
    const controlledItem: {
      name: string;
      price: number;
      tax: boolean;
    } & SelectData = {
      name: 'Powersaw',
      price: 150,
      tax: false,
      labelText: 'Powersaw',
      disabled: true,
      uniqueItemId: 'ps9081231',
    };
    const select = (
      <Select
        selectedItem={controlledItem}
        labelText="Select"
        clearButtonLabel="Clear selection"
        items={tools}
        visualPlaceholder="Choose your tool"
        noItemsText="No items"
        defaultSelectedItem={defaultSelectedTool}
        ariaOptionsAvailableText="Options available"
      />
    );

    await act(async () => {
      const { getByRole, getByText } = render(select);
      expect(getByRole('textbox')).toHaveValue('Powersaw');
      const input = getByRole('textbox');
      await act(async () => {
        fireEvent.click(input);
      });
      const item = await waitFor(() => getByText('Powersaw'));
      expect(item.parentNode).toHaveAttribute('aria-disabled');
      expect(item.parentNode).toHaveClass('fi-select-item--disabled');
    });
  });

  it('does not allow removing of items by clicking', async () => {
    type AnimalData = SelectData & { age: number };
    const animals: AnimalData[] = [
      {
        age: 2,
        labelText: 'Rabbit',
        uniqueItemId: 'rabbit-123',
      },
      {
        age: 1,
        labelText: 'Snail',
        uniqueItemId: 'snail-321',
      },
      {
        age: 5,
        labelText: 'Turtle',
        uniqueItemId: 'turtle-987',
      },
    ];

    const select = (
      <Select<AnimalData>
        items={animals}
        clearButtonLabel="Clear selection"
        selectedItem={{
          age: 5,
          labelText: 'Turtle',
          uniqueItemId: 'turtle-987',
        }}
        labelText="Animals"
        noItemsText="No items"
        visualPlaceholder="Try to choose animal(s)"
        ariaOptionsAvailableText="Options available"
      />
    );

    const { getByText, getByRole } = render(select);
    const clearButton = getByText('Clear selection');
    await act(async () => {
      fireEvent.click(clearButton, {});
    });
    expect(getByRole('textbox')).toHaveValue('Turtle');
  });
});

it('should have correct baseClassName', async () => {
  await act(async () => {
    const { container } = render(BasicSelect);
    expect(container.firstChild).toHaveClass('fi-select');
  });
});

test('className: has given custom classname', async () => {
  await act(async () => {
    const { container } = render(
      <Select
        labelText="Select"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        className="custom-class"
        ariaOptionsAvailableText="Options available"
      />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

test('labelText: has the given text as label', async () => {
  await act(async () => {
    const { queryByText } = render(
      <Select
        labelText="Select"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        ariaOptionsAvailableText="Options available"
      />,
    );
    expect(queryByText('Select')).not.toBeNull();
  });
});

test('visualPlaceholder: has the given text as placeholder attribute', () => {
  const { getByRole } = render(
    <Select
      labelText="Select"
      clearButtonLabel="Clear selection"
      items={[]}
      noItemsText="No items"
      visualPlaceholder="Select item"
      ariaOptionsAvailableText="Options available"
    />,
  );
  const inputfield = getByRole('textbox') as HTMLInputElement;
  expect(inputfield).toHaveAttribute('placeholder', 'Select item');
});

test('id: has the given id', () => {
  const { getByRole } = render(
    <Select
      id="cb-123"
      labelText="Select"
      clearButtonLabel="Clear selection"
      items={[]}
      noItemsText="No items"
      ariaOptionsAvailableText="Options available"
    />,
  );
  expect(getByRole('textbox')).toHaveAttribute('id', 'cb-123');
});

describe('statusText', () => {
  it('should have element and correct classname for it', () => {
    const { getByText } = render(
      <Select
        id="123"
        labelText="Select"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item(s)"
        statusText="EROR EROR"
        ariaOptionsAvailableText="Options available"
      />,
    );
    const statusText = getByText('EROR EROR');
    expect(statusText).toHaveClass('fi-status-text');
  });

  it('will be added to input aria-describedby', () => {
    const { getByRole } = render(
      <Select
        id="123"
        labelText="Select"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item(s)"
        statusText="EROR EROR"
        ariaOptionsAvailableText="Options available"
      />,
    );
    expect(getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      '123-statusText 123-aria-status',
    );
  });
});

describe('status', () => {
  it('should have error classname', () => {
    const { container } = render(
      <Select
        id="123"
        labelText="Select"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item(s)"
        status="error"
        ariaOptionsAvailableText="Options available"
      />,
    );
    expect(container.firstChild).toHaveClass('fi-select--error');
  });
});