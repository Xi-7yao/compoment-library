import React, { useRef, useState, type ReactNode } from "react";
import classNames from "classnames";
import './style.scss'
import { LoadingOutlined } from '@ant-design/icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';
type ButtonSize = 'large' | 'middle' | 'small';
type IconPositionType = 'start' | 'end';
type HtmlType = 'submit' | 'reset' | 'button';

type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;
type NativeAnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'>;

interface BaseProps {
    type?: ButtonType;
    htmlType?: HtmlType;
    size?: ButtonSize;
    block?: boolean;
    className?: string;
    loading?: boolean;
    danger?: boolean;
    ghost?: boolean;
    icon?: ReactNode;
    iconPosition?: IconPositionType;
    children?: ReactNode;
}

type ButtonProps =
    | (BaseProps & { type?: Exclude<ButtonType, 'link'>; onClick?: React.MouseEventHandler<HTMLButtonElement> } & NativeButtonProps)
    | (BaseProps & { type: 'link'; href?: string; onClick?: React.MouseEventHandler<HTMLAnchorElement> } & NativeAnchorProps)

const Button = (props: ButtonProps) => {
    const {
        type = 'default',
        htmlType = 'button',
        size = 'middle',
        block = false,
        className,
        loading = false,
        danger = false,
        ghost = false,
        icon,
        iconPosition = 'start',
        children,
        ...rest
    } = props;

    const [isAnimating, setIsAnimating] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const iconRef = useRef<HTMLElement>(null);

    const btnClass = classNames(className, 'btn', 'btn-init', `btn-${type}`, `btn-${size}`,{
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
        const {
            onClick,
            ...anchorRest
        } = rest as Extract<ButtonProps, { type: 'link' }>;

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (loading) {
                e.preventDefault();
                return;
            }
            getBackground();
            onClick?.(e);
        };

        return (
            <a
                className={btnClass}
                onMouseUp={handleMouseUp}
                onAnimationEnd={handleAnimationEnd}
                onClick={handleClick}
                {...anchorRest}
            >
                {iconPosition === 'start' && renderContent()}
                <span>{children}</span>
                {iconPosition === 'end' && renderContent()}
            </a>
        )
    } else {
        const {
            onClick,
            type,
            ...buttonRest
        } = rest as Extract<ButtonProps, { type?: Exclude<ButtonType, 'link'> }>;

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (loading) {
                e.preventDefault();
                return;
            }
            getBackground();
            onClick?.(e);
        };

        return (
            <button
                ref={btnRef}
                className={btnClass}
                type={htmlType}
                onMouseUp={handleMouseUp}
                onAnimationEnd={handleAnimationEnd}
                onClick={handleClick}
                {...buttonRest}
            >
                {iconPosition === 'start' && renderContent()}
                <span>{children}</span>
                {iconPosition === 'end' && renderContent()}
            </button>
        )
    }
}

export default Button;