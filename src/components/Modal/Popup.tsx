import './Popup.scss';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};
