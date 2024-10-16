import { useState } from 'react'
import './App.css'
import Settings from './Settings'
import Timer from './Timer'
import SettingsContext from './SettingsContext';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(30);
  const [breakMinutes, setBreakMinutes] = useState(10);

  function handleSettings() {
    setShowSettings(!showSettings);
  }

  return (
    <>
      <header>
          <span id="gradient-bar"></span>
      </header>
      <main>
        <SettingsContext.Provider value={{ workMinutes, breakMinutes, setWorkMinutes, setBreakMinutes, showSettings, handleSettings }}>
          {showSettings ?
          <Settings />
          :
          <Timer />}
        </SettingsContext.Provider>
      </main>
      <footer>
        <p>Made with ❤️ by <a href="https://davidbogas.dev" target="_blank">David Bogas</a></p>
      </footer>
    </>
  )
}

export default App
