import { CardType } from '../../types/types';
import './Card.scss';

interface CardProps {
  card: CardType; // Używamy zaimportowanego typu
  handleChoice: (card: CardType) => void; // Funkcja do obsługi wyboru
}
const Card = ({ card, handleChoice }: CardProps) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div>
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
