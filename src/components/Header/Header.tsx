import Button from '../Button/Button';
import './Header.scss';
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
    const formatTime = (time: number): string => {
        let hours: number | string = Math.floor((time / 60 / 60) % 24);
        let minutes: number | string = Math.floor((time / 60) % 60);
        let seconds: number | string = Math.floor(time % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return `${hours}:${minutes}:${seconds}`;
    };

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
