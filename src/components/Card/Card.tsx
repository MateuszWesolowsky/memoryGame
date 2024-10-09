import { CardType } from '../../types/types';
import './Card.scss';

interface CardProps {
  card: CardType;
}

const Card = ({ card }: CardProps) => {
  const handleClick = () => {
    console.log(card);
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
