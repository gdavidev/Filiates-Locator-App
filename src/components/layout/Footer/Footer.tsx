import Button from "../../forms/Button/Button.tsx";
import './style.css';

type FooterProps = {
    onNextClick?: () => void;
}

export default function Footer(props: FooterProps) {
    return (
        <footer>
            <Button text='Proximo' onClick={props.onNextClick} />
        </footer>
    );
}