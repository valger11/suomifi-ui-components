import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { TextInput } from './TextInput';

describe('snapshots match', () => {
  test('minimal implementation', () => {
    const buttonRendered = render(
      <TextInput labelText="Test input" data-testid="textinput" id="test-id" />,
    );
    const { container } = buttonRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
  test('hidden label with placeholder', () => {
    const buttonRendered = render(
      <TextInput
        labelText="Test input"
        data-testid="textinput1"
        id="test-id1"
        labelMode="hidden"
        visualPlaceholder="Test TextInput"
      />,
    );
    const { container } = buttonRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
  test('error status with statustext', () => {
    const buttonRendered = render(
      <TextInput
        labelText="Test input"
        data-testid="textinput2"
        id="test-id2"
        visualPlaceholder="Test TextInput"
        statusText="This is a status text"
        status="error"
      />,
    );
    const { container } = buttonRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
});

test(
  'should not have basic accessibility issues',
  axeTest(
    <TextInput labelText="Test input" data-testid="textinput" id="test-id" />,
  ),
);

describe('props', () => {
  describe('with only minimum props', () => {
    it('has user given aria-describedby on input', () => {
      const { getByRole } = render(
        <TextInput
          labelText="Test input"
          aria-describedby="external-component-id"
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        'external-component-id',
      );
    });
  });

  describe('className', () => {
    it('has the given custom className', () => {
      const { container } = render(
        <TextInput labelText="Test input" className="custom-style" />,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('hintText', () => {
    it('has the hint text element', () => {
      const { getByText } = render(
        <TextInput labelText="Test input" hintText="Example hint text" />,
      );
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-hint-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <TextInput
          labelText="Test input"
          id="123"
          hintText="Example hint text"
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        '123-hintText',
      );
    });
  });

  describe('statusText', () => {
    it('has the status text element', () => {
      const { getByText } = render(
        <TextInput labelText="Test input" statusText="Example status text" />,
      );
      const statusText = getByText('Example status text');
      expect(statusText).toHaveClass('fi-status-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <TextInput
          labelText="Test input"
          id="123"
          statusText="Example status text"
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        '123-statusText',
      );
    });
  });

  describe('type', () => {
    describe('text (default)', () => {
      const textInput = <TextInput labelText="Test input" type="text" />;
      const { getByRole } = render(textInput);
      const textfield = getByRole('textbox') as HTMLInputElement;

      it('shows the inputted text', () => {
        fireEvent.change(textfield, { target: { value: 'abc 123' } });
        expect(textfield.value).toBe('abc 123');
      });
    });

    describe('name', () => {
      const textInput = (
        <TextInput labelText="Named test input" name="test-name" />
      );
      const { getByRole } = render(textInput);
      const namedInput = getByRole('textbox', {
        name: 'Named test input',
      }) as HTMLInputElement;

      it('has the given name attribute', () => {
        expect(namedInput.name).toBe('test-name');
      });
    });

    describe('number', () => {
      const textInput = <TextInput labelText="Number input" type="number" />;
      const { getByRole } = render(textInput);
      const numberfield = getByRole('spinbutton') as HTMLInputElement;

      it('shows the inputted numbers', () => {
        fireEvent.change(numberfield, { target: { value: '123' } });
        expect(numberfield.value).toBe('123');
      });

      it('does not allow text', () => {
        fireEvent.change(numberfield, { target: { value: 'abc' } });
        expect(numberfield.value).toBe('');
        fireEvent.change(numberfield, { target: { value: 'abc 123' } });
        expect(numberfield.value).toBe('');
      });
    });
  });

  describe('disabled', () => {
    it('has disabled attribute and classname', () => {
      const { container, getByRole } = render(
        <TextInput labelText="Test input" data-testid="input" disabled />,
      );
      expect(container.firstChild).toHaveClass('fi-text-input--disabled');

      const inputField = getByRole('textbox') as HTMLInputElement;
      expect(inputField).toHaveAttribute('disabled');
    });
  });

  describe('labelText', () => {
    it('should be found ', () => {
      const { getByText } = render(<TextInput labelText="Test input" />);
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-label-text_label-span');
    });
  });

  describe('optionalText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        <TextInput labelText="label" optionalText="Optional" />,
      );
      const optionalText = getByText('(Optional)');
      expect(optionalText).toHaveClass('fi-label-text_optionalText');
    });
  });

  describe('labelMode', () => {
    it('should be visible by default', () => {
      const { getByText } = render(<TextInput labelText="Test input" />);
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-label-text_label-span');
    });

    it('should be hidden', () => {
      const { getByText } = render(
        <TextInput labelText="Test input" labelMode="hidden" />,
      );
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('visualPlaceholder', () => {
    it('should have the given text', () => {
      const { getByRole } = render(
        <TextInput
          labelText="Test input"
          visualPlaceholder="Enter text here"
        />,
      );
      const inputField = getByRole('textbox') as HTMLInputElement;
      expect(inputField).toHaveAttribute('placeholder', 'Enter text here');
    });
  });

  describe('icon', () => {
    it('should have the correct classname when icon prop is given', () => {
      const { container } = render(
        <TextInput labelText="Test input" icon="close" />,
      );
      expect(container.firstChild).toHaveClass('fi-text-input_with-icon');
    });

    it('should have an icon element when one is specified', () => {
      const { container } = render(
        <TextInput labelText="Test input" icon="close" />,
      );
      const icon = container.querySelector('.fi-icon');
      expect(container.contains(icon)).toBeTruthy();
    });
  });
  describe('visualPlaceholder', () => {
    it('should have the given text', () => {
      const { getByRole } = render(
        <TextInput
          labelText="Test input"
          visualPlaceholder="Enter text here"
        />,
      );
      const inputField = getByRole('textbox') as HTMLInputElement;
      expect(inputField).toHaveAttribute('placeholder', 'Enter text here');
    });
  });

  describe('icon', () => {
    it('should have the correct classname when icon prop is given', () => {
      const { container } = render(
        <TextInput labelText="Test input" icon="close" />,
      );
      expect(container.firstChild).toHaveClass('fi-text-input_with-icon');
    });

    it('should have an icon element when one is specified', () => {
      const { container } = render(
        <TextInput labelText="Test input" icon="close" />,
      );
      const icon = container.querySelector('.fi-icon');
      expect(container.contains(icon)).toBeTruthy();
    });
  });

  describe('debounce', () => {
    it('delays the running of onChange by the given time', () => {
      jest.useFakeTimers();
      const mockOnChange = jest.fn();
      const textInput = (
        <TextInput
          labelText="Debounced input"
          debounce={1000}
          onChange={mockOnChange}
        />
      );
      const { getByRole } = render(textInput);

      const inputElement = getByRole('textbox') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'new value' } });
      expect(mockOnChange).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(mockOnChange).toBeCalledTimes(1);
      expect(inputElement.value).toBe('new value');
    });
    it('resolves right when no onChange is given', () => {
      const textInput = (
        <TextInput labelText="Debounced input" debounce={1000} />
      );
      const { getByRole } = render(textInput);

      const inputElement = getByRole('textbox') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'new value' } });
      expect(inputElement.value).toBe('new value');
    });
  });
});
