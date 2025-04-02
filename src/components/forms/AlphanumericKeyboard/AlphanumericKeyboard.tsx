import Keyboard from "react-simple-keyboard";
import {RefObject, useState} from "react";
import 'react-simple-keyboard/build/css/index.css';
import './style.css';

type AlphanumericKeyboardProps = {
    onChange?: (input: string) => void;
    keyboardRef?: RefObject<any>;
    shown: boolean;
}

export default function AlphanumericKeyboard(props: AlphanumericKeyboardProps) {
    const [shiftEnabled, setShiftEnabled] = useState<boolean>(false);

    return (
        <div className={'keyboard-container' + (props.shown ? ' shown' : '')}>
            <Keyboard
                onChange={props.onChange}
                keyboardRef={ref => {
                    props.keyboardRef && (props.keyboardRef.current = ref);
                }}
                layoutName={shiftEnabled ? "shift" : "default"}
                onKeyPress={(button: string) => {
                    console.log(button);
                    if (["{shift:on}", "{shift:off}"].includes(button))
                        setShiftEnabled(value => !value)
                }}
                layout={{
                    'default': [
                        "1 2 3 4 5 6 7 8 9 0",
                        "q w e r t y u i o p",
                        "a s d f g h j k l {backspace}",
                        "{shift:off} z x c v b n m {ent}",
                        "{space}"
                    ],
                    'shift': [
                        "1 2 3 4 5 6 7 8 9 0",
                        "Q W E R T Y U I O P",
                        "A S D F G H J K L {backspace}",
                        "{shift:on} Z X C V B N M {ent}",
                        "{space}"
                    ],
                }}
                display={{
                    "{space}": " ",
                    "{numbers}": "123",
                    "{ent}": "Enter",
                    "{escape}": "esc ⎋",
                    "{tab}": "tab ⇥",
                    "{backspace}": "⌫",
                    "{capslock}": "caps lock ⇪",
                    "{shift:off}": "⇧",
                    "{shift:on}": "🡅",
                    "{controlleft}": "ctrl ⌃",
                    "{controlright}": "ctrl ⌃",
                    "{altleft}": "alt ⌥",
                    "{altright}": "alt ⌥",
                    "{metaleft}": "cmd ⌘",
                    "{metaright}": "cmd ⌘",
                    "{abc}": "ABC"
                }}
            />
        </div>
    )
}