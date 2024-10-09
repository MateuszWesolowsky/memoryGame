import Card from './components/Card/Card';
import { useEffect, useState } from 'react';
import { CardType } from './types/types';
import './scss/main.scss';

const initialCards = [
  { src: '/img/html.png', isMatched: false, id: 'htmlId1' },
  { src: '/img/html.png', isMatched: false, id: 'htmlId2' },
  { src: '/img/css.png', isMatched: false, id: 'cssId1' },
  { src: '/img/css.png', isMatched: false, id: 'cssId2' },
  { src: '/img/vite.png', isMatched: false, id: 'viteId1' },
  { src: '/img/vite.png', isMatched: false, id: 'viteId2' },
  { src: '/img/node.png', isMatched: false, id: 'nodeId1' },
  { src: '/img/node.png', isMatched: false, id: 'nodeId2' },
  { src: '/img/react.png', isMatched: false, id: 'reactId1' },
  { src: '/img/react.png', isMatched: false, id: 'reactId2' },
  { src: '/img/sass.png', isMatched: false, id: 'sassId1' },
  { src: '/img/sass.png', isMatched: false, id: 'sassId2' },
  { src: '/img/tailwind.png', isMatched: false, id: 'tailwindId1' },
  { src: '/img/tailwind.png', isMatched: false, id: 'tailwindId2' },
  { src: '/img/ts.png', isMatched: false, id: 'tsId1' },
  { src: '/img/ts.png', isMatched: false, id: 'tsId2' },
];

const App = () => {
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [turns, setTurns] = useState<number>(0);

  const shuffleCards = () => {
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: CardType) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceTwo.src) {
              return { ...card, isMatched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log('gdfgdf', choiceOne, choiceTwo);
  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New game</button>
      <p>Turns: {turns}</p>
      <div className="game-board">
        {cards.map((card) => (
          <Card card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
};

export default App;
