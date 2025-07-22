import React, { useRef } from "react";
import classNames from "classnames";
import './style.scss'

type ButtonType = 'primary' | 'default';
type ButtonSize = 'large' | 'middle' | 'small';

export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    block?: boolean;
    children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    const {
        type = 'default',
        size = 'middle',
        disabled = false,
        block = false,
        children,
        ...rest
    } = props;

    const btnClass = classNames(
        'btn',
        `btn-${type}`,
        `btn-${size}`,
        {
            'btn-block': block,
            'btn-disabled': disabled
        }
    )

    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMouseUp = () => {
        if (!btnRef.current) return;
        const node = btnRef.current;
        node.classList.remove('btn-anim');
        // 读取 offsetWidth 触发浏览器重绘
        void node.offsetWidth;
        node.classList.add('btn-anim');
    };

    const handleAnimationEnd = () => {
        if (!btnRef.current) return;
        btnRef.current.classList.remove('btn-anim');
    };

    return (
        <button
            ref={btnRef}
            className={btnClass}
            disabled={disabled}
            onMouseUp={handleMouseUp}
            onAnimationEnd={handleAnimationEnd}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button;