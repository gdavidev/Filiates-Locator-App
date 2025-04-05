import {PropsWithChildren, RefObject, useCallback, useRef, useState} from "react";
import {Context, createContext} from "react";
import AlphanumericKeyboard from "../components/forms/AlphanumericKeyboard/AlphanumericKeyboard.tsx";
import {SimpleKeyboard} from "react-simple-keyboard";

export type KeyboardContextProviderProps = {
    toggle: (state?: boolean, target?: RefObject<HTMLInputElement | null>) => void;
    setInput: (value: string) => void;
    input: string,
    ref: RefObject<SimpleKeyboard | null>;
    setOnChange: (callback: (input: string) => void) => void;
}

export const KeyboardContext: Context<KeyboardContextProviderProps> =
    createContext<KeyboardContextProviderProps>({
        toggle: () => {},
        setInput: () => {},
        input: '',
        ref: null!,
        setOnChange: () => {}
    })

export default function KeyboardContextProvider({children}: PropsWithChildren) {
    const [shown, setShown] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const onChange = useRef<(input: string) => void>(() => {});
    const ref = useRef<SimpleKeyboard>(null);

    const toggleKeyboard =
        useCallback((state?: boolean) => {
            if (state === undefined) {
                setShown(curr => !curr);
            } else {
                setShown(state);
            }
        }, [setShown]);

    const handleInputChanged = useCallback((input: string) => {
        if (ref.current) {
            ref.current.setInput(input);
        }
        setInput(input);
        onChange.current(input);
    }, []);

    const setOnChange =
        useCallback((callback: (input: string) => void) => {
            onChange.current = callback
        }, [onChange]);

    return (
        <KeyboardContext.Provider value={{
            toggle: toggleKeyboard,
            setInput: handleInputChanged,
            input: input,
            ref: ref!,
            setOnChange: setOnChange
        }}>
            {children}
            <AlphanumericKeyboard
                shown={shown}
                keyboardRef={ref}
                onChange={handleInputChanged}/>
        </KeyboardContext.Provider>
    )
}