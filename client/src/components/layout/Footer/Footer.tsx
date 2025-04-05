import LinkButton, {LinkButtonProps} from "../../forms/LinkButton/LinkButton.tsx";
import './style.css';

type FooterProps = {
} & LinkButtonProps

export default function Footer(props: FooterProps) {
    return (
        <footer>
            <LinkButton text={props.text} to={props.to} data={props.data} onClick={props.onClick}  />
        </footer>
    );
}