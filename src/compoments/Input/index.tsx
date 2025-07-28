import './style.scss'
import classNames from "classnames";

type InputSize = 'large' | 'middle' | 'small';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputSize;
    className?: string;
}

const Input = (props: InputProps) => {
    const {
        size = 'middle',
        ...rest
    } = props;

    const inputClass = classNames('input', `input-${size}`);
    
    return (
        <input 
            type="text" 
            className={inputClass}
            {...rest}
        />
    )
}

export default Input;