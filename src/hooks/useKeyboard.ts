import {KeyboardContext, KeyboardContextProviderProps} from "../context/KeyboardContextProvider.tsx";
import {useContext} from "react";

export default function useKeyboard() {
    const keyboardContext: KeyboardContextProviderProps = useContext(KeyboardContext);

    return keyboardContext;
}