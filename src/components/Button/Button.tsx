import './Button.scss';
interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    className = '',
    type = 'button',
}) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {text}
        </button>
    );
};
