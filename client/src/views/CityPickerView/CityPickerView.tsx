import {FocusEvent, useState} from "react";
import DropDownSearch, {DropDownData} from "../../components/forms/DropDownSearch/DropDownSearch.tsx";
import mapSegments from "../../components/map/map-segments.ts";
import useKeyboard from "../../hooks/useKeyboard.ts";
import Header from "../../components/layout/Header/Header.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
import {useNavigate} from "react-router-dom";
import './style.css'

export default function CityPickerView() {
    const navigate = useNavigate();
    const { setInput, toggle: toggleKeyboard, setOnChange } = useKeyboard();
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");

    return (
        <>
            <Header onPreviousClick={() => navigate(-1)} />
            <main>
                <DropDownSearch
                    search={state}
                    options={Object.entries(mapSegments).map(([key, value]) => ({
                        name: key + ' - ' + value.title,
                        value: key
                    }))}
                    onSelected={(data: DropDownData) => setInput(data.name)}
                    onClosing={() => toggleKeyboard(false)}
                    onFocus={(event: FocusEvent<HTMLInputElement>) => {
                        toggleKeyboard(true);
                        setOnChange(setState);
                        setInput(event.target.value);
                    }}
                />

                <DropDownSearch
                    search={city}
                    options={Object.entries(mapSegments).map(([key, value]) => ({
                        name: key + ' - ' + value.title,
                        value: key
                    }))}
                    onSelected={(data: DropDownData) => setInput(data.name)}
                    onClosing={() => toggleKeyboard(false)}
                    onFocus={(event: FocusEvent<HTMLInputElement>) => {
                        toggleKeyboard(true)
                        setOnChange(setCity)
                        setInput(event.target.value);
                    }}
                />
            </main>
            <Footer buttonText="Avançar" onNextClick={() => navigate('/resellers')}/>
        </>
    )
}