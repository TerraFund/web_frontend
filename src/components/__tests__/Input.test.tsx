import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input', () => {
  it('renders label correctly', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('associates label with input', () => {
    render(<Input label="Test Label" />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Test Label" error="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input label="Test Input" />);

    const input = screen.getByLabelText('Test Input');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });
});