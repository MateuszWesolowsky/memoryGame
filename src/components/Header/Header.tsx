import Button from '../Button/Button';
import './Header.scss';
import { formatTime } from './Headers.helpers';
interface HeaderProps {
    shuffleCards: () => void;
    turnsCount: number;
    time: number;
    difficulty: number;
    handleSelectChange: () => void;
}

const Header = ({
    shuffleCards,
    turnsCount,
    time,
    difficulty,
    handleSelectChange,
}: HeaderProps) => {
    return (
        <div className="stats-container">
            <h1>Memory Game</h1>
            <Button onClick={() => shuffleCards()} text="New Game" />
            <div className="stats">
                <p>Turns: {turnsCount}</p>
                <p>Time: {formatTime(time)}</p>
                <div>
                    <label htmlFor="levles">Level:</label>
                    <select
                        id="levles"
                        value={difficulty}
                        onChange={handleSelectChange}
                    >
                        <option value={1}>Easy</option>
                        <option value={2}>Hard</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Header;
