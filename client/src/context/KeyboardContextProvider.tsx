import {PropsWithChildren, RefObject, useCallback, useRef, useState} from "react";
import {Context, createContext} from "react";
import AlphanumericKeyboard from "../components/forms/AlphanumericKeyboard/AlphanumericKeyboard.tsx";

export type KeyboardContextProviderProps = {
    toggle: (state?: boolean) => void;
    setInput: (value: string) => void;
    input: string,
    ref: RefObject<null> | null;
}

export const KeyboardContext: Context<KeyboardContextProviderProps> =
    createContext<KeyboardContextProviderProps>({
        toggle: () => {},
        setInput: () => {},
        input: '',
        ref: null,
    })

export default function KeyboardContextProvider({children}: PropsWithChildren) {
    const [shown, setShown] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const ref = useRef(null);

    const toggleKeyboard = useCallback((state?: boolean) => {
        if (state === undefined)
            return setShown(curr => !curr);
        setShown(state);
    }, [setShown])

    const handleInputChanged = useCallback((input: string) => {
        setInput(input);
    }, [setInput]);

    return (
        <KeyboardContext.Provider value={{
            toggle: toggleKeyboard,
            ref: ref,
            input: input,
            setInput: setInput
        }}>
            {children}
            <AlphanumericKeyboard
                shown={shown}
                keyboardRef={ref}
                onChange={handleInputChanged} />
        </KeyboardContext.Provider>
    )
}