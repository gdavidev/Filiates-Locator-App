import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import Header from "./components/layout/Header/Header.tsx";
import Footer from "./components/layout/Footer/Footer.tsx";
import DropDownSearch, {DropDownData} from "./components/forms/DropDownSearch/DropDownSearch.tsx";
import mapSegments from "./components/map/map-segments.ts";
import AlphanumericKeyboard from "./components/forms/AlphanumericKeyboard/AlphanumericKeyboard.tsx";
import './App.css'

export default function App() {
    const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
    const [citySearch, setCitySearch] = useState<string>("");
    const keyboardRef = useRef<any>(null);

    useEffect(() => {
        return () => setKeyboardShown(false);
    }, []);

    const handleInputChanged = useCallback((value: string) => {
        keyboardRef.current && keyboardRef.current.setInput(value);
        setCitySearch(value);
    }, [keyboardRef, setCitySearch]);

    return (
        <>
            <Header/>
            <main>
                <DropDownSearch
                    search={citySearch}
                    options={Object.entries(mapSegments).map(([key, value]) => ({
                        name: key + ' - ' + value.title,
                        value: key
                    }))}
                    onSelected={(data: DropDownData) => {
                        handleInputChanged(data.name)
                        setKeyboardShown(false);
                    }}
                    onInputChanged={(e: ChangeEvent<HTMLInputElement>) => handleInputChanged(e.target.value)}
                    onClick={() => setKeyboardShown(true)}
                />
            </main>
            <AlphanumericKeyboard
                shown={keyboardShown}
                keyboardRef={keyboardRef}
                onChange={handleInputChanged} />
            <Footer/>
        </>
    )
}
