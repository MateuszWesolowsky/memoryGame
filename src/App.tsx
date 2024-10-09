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
    const [cards, setCards] = useState<CardType[]>([]);
    const [difficulty, setDifficulty] = useState<number>(1);
    const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
    const [turns, setTurns] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);

    const formatTime = (time: number): string => {
        let hours: number | string = Math.floor((time / 60 / 60) % 24);
        let minutes: number | string = Math.floor((time / 60) % 60);
        let seconds: number | string = Math.floor(time % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (running) {
            interval = setInterval(() => {
                setTime((pre) => pre + 1);
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDifficulty(Number(event.target.value));
    };

    const shuffleCards = () => {
        let cardsByDiff = [...initialCards].slice(0, 4);
        if (difficulty === 2) {
            cardsByDiff = [...initialCards].slice(0, 6);
        } else if (difficulty === 3) {
            cardsByDiff = [...initialCards];
        }
        const shuffledCards = [...cardsByDiff].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setTurns(0);
        setTime(0);
        setRunning(false);
    };

    const handleChoice = (card: CardType) => {
        setRunning(true);
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

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prev) => prev + 1);
    };

    return (
        <div className="App">
            <h1>Memory Game</h1>
            <div>
                <button onClick={shuffleCards}>New game</button>
                <p>Turns: {turns}</p>
                <p>Time: {formatTime(time)}</p>
                <div>
                    <label htmlFor="levles">Wybierz pozion trudności:</label>
                    <select
                        id="levles"
                        value={difficulty}
                        onChange={handleSelectChange}
                    >
                        <option value={1}>Łatwy</option>
                        <option value={2}>Średni</option>
                        <option value={3}>Trudny</option>
                    </select>
                </div>
            </div>
            <div className="game-board">
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card.id}
                        handleChoice={handleChoice}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
