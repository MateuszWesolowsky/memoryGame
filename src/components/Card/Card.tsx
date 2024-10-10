import { CardType } from '../../types/types';
import './Card.scss';

interface CardProps {
    card: CardType;
    handleChoice: (card: CardType) => void;
    flipped: boolean;
}
const Card = ({ card, handleChoice, flipped }: CardProps) => {
    const handleClick = () => {
        handleChoice(card);
    };

    return (
        <div className="card">
            <div data-state={flipped ? 'flipped' : ''}>
                <img className="front" src={card.src} alt="card" />
                <img
                    className="back"
                    src="/img/cover.png"
                    alt="card"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default Card;
