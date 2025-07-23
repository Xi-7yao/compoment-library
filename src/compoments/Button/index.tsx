import React, { useRef, useState } from "react";
import classNames from "classnames";
import './_style.scss'
import { LoadingOutlined } from '@ant-design/icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'ghost';
type ButtonSize = 'large' | 'middle' | 'small';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: ButtonType;
    htmlType?: 'submit' | 'reset' | 'button';
    loading?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    block?: boolean;
    danger?: boolean;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
    const {
        type = 'default',
        loading = false,
        size = 'middle',
        disabled = false,
        block = false,
        danger = false,
        htmlType = 'button',
        children,
        onClick,
        ...rest
    } = props;

    const [isAnimating, setIsAnimating] = useState(false);

    const btnClass = classNames(
        'btn',
        `btn-${type}`,
        `btn-${size}`,
        {
            'btn-danger': danger,
            'btn-loading': loading,
            'btn-block': block,
            'btn-anim': isAnimating,
        }
    )

    const loadClass = classNames('btn-icon');

    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loading) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    const handleMouseUp = () => {
        if (!btnRef.current || loading || type === 'text' || type === 'link') return;
        setIsAnimating(true);
    };

    const handleAnimationEnd = () => {
        if (!btnRef.current) return;
        setIsAnimating(false);
    };

    return (
        <button
            ref={btnRef}
            className={btnClass}
            disabled={disabled}
            type={htmlType}
            onMouseUp={handleMouseUp}
            onAnimationEnd={handleAnimationEnd}
            onClick={handleClick}
            {...rest}
        >
            <TransitionGroup component={null}>
                {loading && (
                    <CSSTransition
                        classNames="loading-fade"
                        timeout={200}
                        appear
                        unmountOnExit
                        nodeRef={btnRef}
                    >
                        <span ref={btnRef} className={loadClass}>
                            <LoadingOutlined />
                        </span>
                    </CSSTransition>
                )}
            </TransitionGroup>
            <span>{children}</span>
        </button>
    )
}

export default Button;