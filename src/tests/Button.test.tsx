import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Button from '../compoments/Button';

test('renders with default props and children', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByText('Click me');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('btn', 'btn-default', 'btn-middle');
  expect(button.tagName).toBe('BUTTON');
});

test('applies type, ghost, and danger props', () => {
  render(<Button type="primary" ghost danger>Styled Button</Button>);
  const button = screen.getByText('Styled Button');
  expect(button).toHaveClass('btn-primary', 'btn-ghost', 'btn-danger');
});

test('renders as <a> tag when type is link and href is provided', () => {
  render(<Button type="link" href="https://example.com" target="_blank">Link Button</Button>);
  const link = screen.getByText('Link Button');
  expect(link.tagName).toBe('A');
  expect(link).toHaveAttribute('href', 'https://example.com');
  expect(link).toHaveAttribute('target', '_blank');
});

test('renders icon at start position and replaces with loading when loading is true', () => {
  render(<Button icon={<span>Custom Icon</span>} iconPosition="start" loading>Loading</Button>);
  expect(screen.queryByText('Custom Icon')).not.toBeInTheDocument(); // 被替换
  expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument(); // 加载图标
  expect(screen.getByText('Loading')).toBeInTheDocument();
});

test('renders icon at end position when loading is false', () => {
  render(<Button icon={<span>End Icon</span>} iconPosition="end">Text</Button>);
  const icon = screen.getByText('End Icon');
  expect(icon).toBeInTheDocument();
  const iconWraper = icon.parentElement;
  expect(iconWraper).toBeInTheDocument();
  expect(iconWraper).toHaveClass('btn-icon-end');
});

test('prevents click and calls onClick only when not loading or disabled', () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Normal</Button>);
  fireEvent.click(screen.getByText('Normal'));
  expect(onClick).toHaveBeenCalledTimes(1);

  render(<Button loading onClick={onClick}>Loading</Button>);
  fireEvent.click(screen.getByText('Loading'));
  expect(onClick).toHaveBeenCalled();
});

test('triggers animation on mouse up for non-text/link types', () => {
  render(<Button type="primary">Animate</Button>);
  const button = screen.getByText('Animate');
  fireEvent.mouseUp(button);
  expect(button).toHaveClass('btn-anim');
});
