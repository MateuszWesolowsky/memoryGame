import './GameBoardView.scss';
import { CardType, LocalStorageTypes } from '../types/types';
import { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { data } from '../data/data';
import { Card } from '../components/Card/Card';
import { Popup } from '../components/Modal/Popup';
import { Header } from '../components/Header/Header';

export const GameBoardView = () => {
    const [difficulty, setDifficulty] = useState<number>(1);
    const [running, setRunning] = useState<boolean>(false);
    const [shuffledCards, setShufledCards] = useState<CardType[]>([]);
    const [isResultSaved, setIsResultSaved] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {
        time,
        setTime,
        turnsCount,
        setTurnsCount,
        matchedCardsIds,
        setMatchedCardsIds,
        flippedCardsIds,
        setFlippedCardsIds,
    } = useGameStore();

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
        const initialCards = data;
        let cardsByDiff = [...initialCards].slice(0, 4);
        if (difficulty === 2) {
            cardsByDiff = [...initialCards].slice(0, 8);
        }
        const shuffledCards = [...cardsByDiff].sort(() => Math.random() - 0.5);
        setShufledCards(shuffledCards);
        setMatchedCardsIds([]);
        setFlippedCardsIds([]);
        setTurnsCount(0);
        setTime(0);
        setRunning(false);
        setIsResultSaved(false);
    };

    const handleChoice = (id: string) => {
        setRunning(true);
        if (flippedCardsIds.length === 2) return;
        if (flippedCardsIds.length === 0) {
            setFlippedCardsIds([id]);
            return;
        }

        setFlippedCardsIds([...flippedCardsIds, id]);

        const firstCardName = shuffledCards.find(
            (card) => card.id === flippedCardsIds[0]
        )?.name;
        const secondCardName = shuffledCards.find(
            (card) => card.id === id
        )?.name;

        if (firstCardName === secondCardName) {
            setMatchedCardsIds([...matchedCardsIds, flippedCardsIds[0], id]);
        }

        setTurnsCount(turnsCount + 1);
        setTimeout(() => {
            setFlippedCardsIds([]);
        }, 500);
    };

    const addItemsToLocalStorage = (newItem: LocalStorageTypes) => {
        const existingData = localStorage.getItem('gameHistory');
        let dataList = [];
        if (existingData) {
            dataList = JSON.parse(existingData);
        }
        dataList.push(newItem);
        localStorage.setItem('gameHistory', JSON.stringify(dataList));
    };

    useEffect(() => {
        if (matchedCardsIds.length === shuffledCards.length && isResultSaved) {
            setRunning(false);
            addItemsToLocalStorage({
                time: time,
                turns: turnsCount,
                date: new Date().toISOString(),
            });
            setTimeout(() => {
                setIsPopupOpen(true);
            }, 1000);
        }
        setIsResultSaved(true);
    }, [matchedCardsIds, shuffledCards, isResultSaved]);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <>
            <Header
                handleSelectChange={handleSelectChange}
                difficulty={difficulty}
                time={time}
                turnsCount={turnsCount}
                shuffleCards={shuffleCards}
            />
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <h2>You won !</h2>
                <p>Time: {time}</p>
                <p>Turns: {turnsCount}</p>
            </Popup>
            <div className="game-board">
                {shuffledCards.map((card) => (
                    <Card
                        card={card}
                        key={card.id}
                        handleChoice={() => handleChoice(card.id)}
                        flipped={
                            matchedCardsIds.includes(card.id) ||
                            flippedCardsIds.includes(card.id)
                        }
                    />
                ))}
            </div>
        </>
    );
};
