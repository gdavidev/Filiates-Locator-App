import {forwardRef, DetailedHTMLProps, InputHTMLAttributes} from "react";
import './style.css'

type TextInputProps = {
    error: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((
    props: TextInputProps,
    ref,
) => {
    return (
        <input
            ref={ref}
            {...props}
            type="text"
            className={'text-input'
                + (props.error === "true" ? ' has-error' : '')
                + (props.className ? ' ' + props.className : '')}
        />
    )
})

export default TextInput;