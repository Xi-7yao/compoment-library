import React, { useRef, useState } from "react";
import classNames from "classnames";
import './style.scss'
import { LoadingOutlined } from '@ant-design/icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';
type ButtonSize = 'large' | 'middle' | 'small';

type SharedProps = Omit<React.HTMLAttributes<HTMLElement>, 'type' | 'onClick'>;
type ButtonHTMLProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;
type AnchorHTMLProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'>;
type iconPositionType = 'start' | 'end';

interface ButtonProps extends SharedProps {
    type?: ButtonType;
    htmlType?: 'submit' | 'reset' | 'button';
    loading?: boolean;
    ghost?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    block?: boolean;
    danger?: boolean;
    href?: string;
    target?: string;
    icon?: React.ReactNode;
    iconPosition?: iconPositionType;
    children?: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button = (props: ButtonProps) => {
    const {
        type = 'default',
        loading = false,
        size = 'middle',
        disabled = false,
        block = false,
        danger = false,
        ghost = false,
        htmlType = 'button',
        icon = null,
        iconPosition = 'start',
        className,
        href,
        target,
        children,
        onClick,
        ...rest
    } = props;

    const [isAnimating, setIsAnimating] = useState(false);

    const btnClass = classNames(className,
        'btn',
        'btn-init',
        `btn-${type}`,
        `btn-${size}`,
        {
            'btn-danger': danger,
            'btn-loading': loading,
            'btn-block': block,
            'btn-anim': isAnimating,
            'btn-ghost': ghost,
            'btn-icon-only': !children,
        }
    )

    const iconClass = classNames({
        'btn-icon-start': iconPosition === 'start' && children,
        'btn-icon-end': iconPosition === 'end' && children,
    });

    const btnRef = useRef<HTMLButtonElement>(null);
    const iconRef = useRef<HTMLElement>(null);

    const getBackground = () => {
        if (btnRef.current) {
            const btn = btnRef.current;
            const colorStr = window.getComputedStyle(btn).getPropertyValue('--animation-color');

            const rgb = [
                parseInt(colorStr.slice(1, 3), 16),
                parseInt(colorStr.slice(3, 5), 16),
                parseInt(colorStr.slice(5, 7), 16)
            ];
            const start = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.1)`;
            const end = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.03)`;

            btn.style.setProperty('--anim-start', start);
            btn.style.setProperty('--anim-end', end);
        }
    };


    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (loading) {
            e.preventDefault();
            return;
        }
        getBackground();
        onClick?.(e);
    };

    const handleMouseUp = () => {
        if (!btnRef.current || loading || type === 'link' || type === 'text') return;
        setIsAnimating(true);
    };

    const handleAnimationEnd = () => {
        if (!btnRef.current) return;
        setIsAnimating(false);
    };

    const renderIcon = () => {
        if (loading) {
            return (
                <CSSTransition
                    classNames={"loading-fade"}
                    timeout={200}
                    nodeRef={iconRef}
                >
                    <span ref={iconRef} className={iconClass}>
                        <LoadingOutlined />
                    </span>
                </CSSTransition>

            )
        } else if (icon) {
            return (
                <CSSTransition
                    classNames={"loading-fade"}
                    timeout={200}
                    nodeRef={iconRef}
                >
                    <span className={iconClass}>
                        {icon}
                    </span>
                </CSSTransition>
            )
        } else {
            return null
        }
    }
    const renderContent = () => {
        return (
            <TransitionGroup component={null}>
                {renderIcon()}
            </TransitionGroup>
        )
    }

    if (type === 'link') {
        return (
            <a
                href={href}
                className={btnClass}
                onMouseUp={handleMouseUp}
                onAnimationEnd={handleAnimationEnd}
                onClick={handleClick}
                target={target}
                {...rest as AnchorHTMLProps}
            >
                {iconPosition === 'start' && renderContent()}
                <span>{children}</span>
                {iconPosition === 'end' && renderContent()}
            </a>
        )
    }

    return (
        <button
            ref={btnRef}
            className={btnClass}
            disabled={disabled}
            type={htmlType}
            onMouseUp={handleMouseUp}
            onAnimationEnd={handleAnimationEnd}
            onClick={handleClick}
            {...rest as ButtonHTMLProps}
        >
            {iconPosition === 'start' && renderContent()}
            <span>{children}</span>
            {iconPosition === 'end' && renderContent()}
        </button>
    )
}

export default Button;