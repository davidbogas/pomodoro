function SettingsButton(props) {
    return (
        <button onClick={props.onClick} className="settings-button">
            {props.state ? 'Save' : 'Settings'}
        </button>
    );
}

export default SettingsButton;