import circleArrow from '@icons/circle-arrow.svg'
import logo from '@images/norton.svg'

type HeaderProps = {
    onPreviousClick?: () => void;
}

export default function Header(props: HeaderProps) {
    return (
        <header>
            <button onClick={props.onPreviousClick}>
                <img src={circleArrow} alt="previus page button"  />
            </button>
            <img src={logo} alt="logo"  />
        </header>
    )
}