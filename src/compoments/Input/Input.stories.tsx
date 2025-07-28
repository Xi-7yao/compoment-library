import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';
import '../../styles/index.scss';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['large', 'middle', 'small'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    type: {
      control: 'text',
      defaultValue: 'text',
    },
  },
  args: {
    size: 'middle',
    placeholder: '请输入内容',
    disabled: false,
    type: 'text',
    value: '',
  }
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Large: Story = { args: { size: 'large' } };
export const Small: Story = { args: { size: 'small' } };
