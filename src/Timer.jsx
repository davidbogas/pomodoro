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

function Timer(props) {
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const audio = new Audio('/audio/timer.mp3');

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;

        audio.play();
    }

        function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function initTimer() {
        setSecondsLeft(settingsInfo.workMinutes * 60);
    }

    useEffect (() => {
        initTimer();

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [settingsInfo]);

    const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);
    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    function handlePlayPause() {
        setIsPaused(!isPaused);
        isPausedRef.current = !isPausedRef.current;
    }

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
                    text={minutes + ':' + seconds}
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
}

export default Timer;