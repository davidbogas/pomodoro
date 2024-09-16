function PlayButton(props) {
    return (
        <button onClick={props.onClick} className="play-button">
            {props.state ? 'Play' : 'Pause'}
        </button>
    );
}

export default PlayButton;