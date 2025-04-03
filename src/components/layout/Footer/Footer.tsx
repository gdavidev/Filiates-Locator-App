import Button from "../../forms/Button/Button.tsx";
import './style.css';

type FooterProps = {
    buttonText: string;
    onNextClick?: () => void;
}

export default function Footer(props: FooterProps) {
    return (
        <footer>
            <Button text={props.buttonText} onClick={props.onNextClick} />
        </footer>
    );
}