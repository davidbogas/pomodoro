import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";
import { useContext } from "react";


function Settings(props) {
    const settingsInfo = useContext(SettingsContext);

    return (
        <div className="container">
            <div>
                <h1>Settings</h1>
            </div>
            <div>
                <label htmlFor="work-time">Work minutes:</label>
                <input id="work-time" type="number" min="1" max="60" value={settingsInfo.workMinutes} onChange={(e) => settingsInfo.setWorkMinutes(e.target.value)} />
                <label htmlFor="break-time">Break minutes:</label>
                <input id="break-time" type="number" min="1" max="60" value={settingsInfo.breakMinutes} onChange={(e) => settingsInfo.setBreakMinutes(e.target.value)} />
                <SettingsButton onClick={settingsInfo.handleSettings} state={settingsInfo.showSettings} />
            </div>
        </div>
    );
}

export default Settings;