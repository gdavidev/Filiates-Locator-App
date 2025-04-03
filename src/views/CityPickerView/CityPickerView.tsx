import './style.css'
import DropDownSearch, {DropDownData} from "../../components/forms/DropDownSearch/DropDownSearch.tsx";
import mapSegments from "../../components/map/map-segments.ts";
import {ChangeEvent} from "react";
import useKeyboard from "../../hooks/useKeyboard.ts";

export default function CityPickerView() {
    const { input, setInput, toggle: toggleKeyboard } = useKeyboard();

    return (
        <>
            <DropDownSearch
                search={input}
                options={Object.entries(mapSegments).map(([key, value]) => ({
                    name: key + ' - ' + value.title,
                    value: key
                }))}
                onSelected={(data: DropDownData) => {
                    setInput(data.name)
                    toggleKeyboard(false);
                }}
                onInputChanged={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onClick={() => toggleKeyboard(true)}
            />
        </>
    )
}