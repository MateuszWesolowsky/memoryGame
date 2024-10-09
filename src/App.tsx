import Card from './components/Card/Card';
import './components/Card/Card.scss';
import { useState } from 'react';
import { CardType } from './types/types';

const initialCards: CardType[] = [
  { src: '/img/html.png', isMatched: false, id: 'htmlId1' },
  { src: '/img/html.png', isMatched: false, id: 'htmlId2' },
  { src: '/img/css.png', isMatched: false, id: 'cssId1' },
  { src: '/img/css.png', isMatched: false, id: 'cssId2' },
  { src: '/img/vite.png', isMatched: false, id: 'viteId1' },
  { src: '/img/vite.png', isMatched: false, id: 'viteId2' },
  { src: '/img/node.png', isMatched: false, id: 'nodeId2' },
  { src: '/img/node.png', isMatched: false, id: 'nodeId2' },
  { src: '/img/react.png', isMatched: false, id: 'reactId2' },
  { src: '/img/react.png', isMatched: false, id: 'reactId2' },
  { src: '/img/sass.png', isMatched: false, id: 'sassId2' },
  { src: '/img/sass.png', isMatched: false, id: 'sassId2' },
  { src: '/img/tailwind.png', isMatched: false, id: 'tailwindId2' },
  { src: '/img/tailwind.png', isMatched: false, id: 'tailwindId2' },
  { src: '/img/ts.png', isMatched: false, id: 'tsId2' },
  { src: '/img/ts.png', isMatched: false, id: 'tsId2' },
];

const App = () => {
  const [cards, setCards] = useState<CardType[]>(initialCards);

  const shuffleCards = () => {
    const shuffleCards = initialCards.sort(() => Math.random() - 0.5);
    setCards(shuffleCards);
  };
  console.log(cards);
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New game</button>
      <div className="game-board">
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
