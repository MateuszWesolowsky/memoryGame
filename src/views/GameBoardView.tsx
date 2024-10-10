import Card from '../components/Card/Card';
import { CardType } from '../types/types';
import { useEffect, useState } from 'react';
import '../scss/main.scss';
import { useGameStore } from '../store';

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
];

const GameBoardView = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [difficulty, setDifficulty] = useState<number>(1);
    const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
    const [running, setRunning] = useState<boolean>(false);

    const { turnsCount, setTurnsCount } = useGameStore();
    const { time, setTime } = useGameStore();

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
                setTime(time + 1);
            }, 1000);
        } else if (!running) {
            // || matchedCard.length === cards.length
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, time, setTime]);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDifficulty(Number(event.target.value));
    };

    const shuffleCards = () => {
        let cardsByDiff = [...initialCards].slice(0, 4);
        if (difficulty === 2) {
            cardsByDiff = [...initialCards].slice(0, 8);
        } else if (difficulty === 3) {
            cardsByDiff = [...initialCards];
        }
        const shuffledCards = [...cardsByDiff].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurnsCount(0);
        setTime(0);
        setRunning(false);
    };

    const handleChoice = (card: CardType) => {
        console.log(card);
        setRunning(true);
        if (choiceOne) {
            setChoiceTwo(card);
        } else {
            setChoiceOne(card);
        }
    };

    // const { matchedCards, setMatchedCards } = useGameStore();

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards((prev) => {
                    return prev.map((card) => {
                        if (card.src === choiceOne.src) {
                            const updatedCard = { ...card, isMatched: true };
                            localStorage.setItem(
                                'myDataKey',
                                JSON.stringify(updatedCard)
                            );
                            // setMatchedCards([...matchedCards, updatedCard]);
                            return updatedCard;
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
        setTurnsCount(turnsCount + 1);
    };

    // console.log(matchedCards);
    console.log(time);
    return (
        <div>
            <h1>Memory Game</h1>

            <button onClick={shuffleCards}>New game</button>
            <p>Turns: {turnsCount}</p>
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
            <div className="game-board">
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card.id}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.isMatched
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoardView;
