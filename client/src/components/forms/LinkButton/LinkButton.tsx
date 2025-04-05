import {HTMLAttributes, MouseEvent} from "react";
import './style.css';
import {Link} from "react-router-dom";

export type LinkButtonProps = {
    text: string;
    to: string;
    data?: Record<string, number | string | []>;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
} & HTMLAttributes<HTMLAnchorElement>;

export default function LinkButton(props: LinkButtonProps) {
    return (
        <Link className="btn" to={props.to} state={props.data} onClick={props.onClick}>
            {props.text}
        </Link>
    );
}