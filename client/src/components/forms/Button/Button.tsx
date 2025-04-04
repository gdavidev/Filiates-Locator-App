import {HTMLAttributes} from "react";
import './style.css';

type ButtonProps = {
    text: string;
} & HTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
    return (
      <button {...props} className={'btn ' + props.className}>
          {props.text}
      </button>
    );
}