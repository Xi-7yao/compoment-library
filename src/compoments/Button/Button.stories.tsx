import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';
import { SettingOutlined } from '@ant-design/icons';
import '../../styles/index.scss'

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        type: {
            options: ['primary', 'default', 'dashed', 'text', 'link'],
            control: { type: 'select' },
        },
        size: {
            options: ['large', 'middle', 'small'],
            control: { type: 'radio' },
        },
        loading: { control: 'boolean' },
        danger: { control: 'boolean' },
        ghost: { control: 'boolean' },
        disabled: { control: 'boolean' },
        block: { control: 'boolean' },
        icon: { table: { disable: true } },
        onClick: { table: { disable: true } },
        iconPosition: {
            options: ['start', 'end'],
            control: { type: 'radio' },
        },
    },
    args: {
        children: 'Button',
        type: 'default',
        size: 'middle',
        loading: false,
        disabled: false,
        danger: false,
        ghost: false,
        block: false,
        icon: undefined,
        iconPosition: 'start'
    }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        size: "middle",
        block: false
    }
};

export const WithIcon: Story = {
    args: {
        icon: <SettingOutlined />,
        children: 'Settings',
    },
};

export const Types: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button {...args} type="primary">Primary</Button>
            <Button {...args} type="default">Default</Button>
            <Button {...args} type="dashed">Dashed</Button>
            <Button {...args} type="text">Text</Button>
            <Button {...args} type="link" href="#">Link</Button>
        </div>
    ),
};

export const Loading: Story = {
    args: {
        loading: true,
        children: 'Loading',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled',
    },
};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button {...args} size="large">Large</Button>
            <Button {...args} size="middle">Middle</Button>
            <Button {...args} size="small">Small</Button>
        </div>
    ),
};

export const Danger: Story = {
    args: {
        danger: true,
        children: 'Danger',
    },
}