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
      <main>
        <SettingsContext.Provider value={{ workMinutes, breakMinutes, setWorkMinutes, setBreakMinutes, showSettings, handleSettings }}>
          {showSettings ?
          <Settings />
          :
          <Timer />}
        </SettingsContext.Provider>
      </main>
    </>
  )
}

export default App
