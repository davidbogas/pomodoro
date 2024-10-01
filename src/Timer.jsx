import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect, useContext, useRef } from 'react';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import SettingsContext from './SettingsContext';

const primaryColor = '#f87934';
const secondaryColor = '#784bc2';
const trailColorWork = '#f8793422';
const trailColorBreak = '#784bc222';
const textColor = '#ffffff';

const Timer = () => {
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);

    const audio = useRef(new Audio('/audio/timer.mp3')).current;

    const switchMode = () => {
        const nextMode = mode === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

        setMode(nextMode);
        setSecondsLeft(nextSeconds);

        audio.play();
    };

    useEffect(() => {
        const initialSeconds = settingsInfo.workMinutes * 60;
        setSecondsLeft(initialSeconds);
    }, [settingsInfo]);

    const handlePlayPause = () => {
        setIsPaused(prevIsPaused => !prevIsPaused);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prevSecondsLeft) => {
                if (isPaused) return prevSecondsLeft;

                if (prevSecondsLeft === 0) {
                    switchMode();
                    return prevSecondsLeft;
                }

                return prevSecondsLeft - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, settingsInfo]);

    const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60;

    const styles = buildStyles({
        pathColor: mode === 'work' ? primaryColor : secondaryColor,
        trailColor: mode === 'work' ? trailColorWork : trailColorBreak,
        textColor: textColor,
    });

    return (
        <div className="container">
            <div>
                <h1>Simple Pomodoro</h1>
                <h2>{mode === 'work' ? 'Work time' : 'Break time'}</h2>
            </div>
            <div className="content">
                <CircularProgressbar
                    value={percentage}
                    text={`${minutes}:${seconds}`}
                    strokeWidth={3}
                    styles={styles}
                />
            </div>
            <div>
                <PlayButton onClick={handlePlayPause} state={isPaused} />
            </div>
            <div>
                <SettingsButton onClick={settingsInfo.handleSettings} state={settingsInfo.showSettings} />
            </div>
        </div>
    );
};

export default Timer;