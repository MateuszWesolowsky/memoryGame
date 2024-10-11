import Card from '../components/Card/Card';
import { CardType } from '../types/types';
import { useEffect, useState } from 'react';
import '../scss/main.scss';
import { useGameStore } from '../store';

const initialCards = [
    {
        src: '/img/html.png',
        name: 'html_card',
        id: 'htmlId1',
    },
    {
        src: '/img/html.png',
        name: 'html_card',
        id: 'htmlId2',
    },
    { src: '/img/css.png', name: 'css_card', id: 'cssId1' },
    { src: '/img/css.png', name: 'css_card', id: 'cssId2' },
    {
        src: '/img/vite.png',
        name: 'vite_card',
        id: 'viteId1',
    },
    {
        src: '/img/vite.png',
        name: 'vite_card',
        id: 'viteId2',
    },
    {
        src: '/img/node.png',
        name: 'node_card',
        id: 'nodeId1',
    },
    {
        src: '/img/node.png',
        name: 'node_card',
        id: 'nodeId2',
    },
    {
        src: '/img/react.png',
        name: 'react_card',
        id: 'reactId1',
    },
    {
        src: '/img/react.png',
        name: 'react_card',
        id: 'reactId2',
    },
    {
        src: '/img/sass.png',
        name: 'sass_card',
        id: 'sassId1',
    },
    {
        src: '/img/sass.png',
        name: 'sass_card',
        id: 'sassId2',
    },
];

const GameBoardView = () => {
    const [difficulty, setDifficulty] = useState<number>(1);
    const [running, setRunning] = useState<boolean>(false);
    const [shuffledCards, setShufledCards] = useState<CardType[]>([]);
    const [flippedCardsIds, setFlippedCardsIds] = useState<string[]>([]);
    const {
        time,
        setTime,
        turnsCount,
        setTurnsCount,
        matchedCardsId,
        setMatchedCardsId,
    } = useGameStore();

    console.log(matchedCardsId);

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
        }
        if (!running) {
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
        setShufledCards(shuffledCards);
        setMatchedCardsId([]);
        setTurnsCount(0);
        setTime(0);
        setRunning(false);
    };

    const handleChoice = (id: string) => {
        setRunning(true);
        if (matchedCardsId.includes(id)) return;

        if (flippedCardsIds.length === 2) return;

        if (flippedCardsIds.length === 0) {
            setFlippedCardsIds([id]);
            return;
        }

        setFlippedCardsIds((prevFlippedCards) => [...prevFlippedCards, id]);

        const firstCardName = shuffledCards.find(
            (card) => card.id === flippedCardsIds[0]
        )?.name;
        const secondCardName = shuffledCards.find(
            (card) => card.id === id
        )?.name;

        if (firstCardName === secondCardName) {
            setMatchedCardsId(flippedCardsIds[0]);
            setMatchedCardsId(id);
        }

        setTimeout(() => {
            setTurnsCount(turnsCount + 1);
            setFlippedCardsIds([]);
        }, 500);
    };
    useEffect(() => {
        if (matchedCardsId.length === shuffledCards.length) {
            setRunning(false);
        }
    }, [matchedCardsId, shuffledCards]);

    useEffect(() => {
        shuffleCards();
    }, []);

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
                {shuffledCards.map((card) => (
                    <Card
                        card={card}
                        key={card.id}
                        handleChoice={() => handleChoice(card.id)}
                        flipped={
                            matchedCardsId.includes(card.id) ||
                            flippedCardsIds.includes(card.id)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoardView;
