import circleArrow from '@icons/circle-arrow.svg'
import logo from '@images/norton.svg'
import './style.css';

type HeaderProps = {
    onPreviousClick?: () => void;
}

export default function Header(props: HeaderProps) {
    return (
        <>
            <header>
                <button
                    id='header-previous-btn'
                    style={{ display: props.onPreviousClick ? 'none' : 'block' }}
                    onClick={props.onPreviousClick}
                >
                    <img src={circleArrow} alt="previus page button"  />
                </button>
                <img id='header-logo' src={logo} alt="logo"  />
            </header>
            <div id='header-spacing' />
        </>
    )
}