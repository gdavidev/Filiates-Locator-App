import {FocusEvent, MouseEvent, useCallback, useEffect, useState} from "react";
import DropDownSearch, {DropDownData} from "../../components/forms/DropDownSearch/DropDownSearch.tsx";
import useKeyboard from "../../hooks/useKeyboard.ts";
import Header from "../../components/layout/Header/Header.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
import {useNavigate} from "react-router-dom";
import {useResellersAllStates, useResellersCitiesByState} from "../../hooks/api/useResellers.ts";
import './style.css'

type FormItem<T> = { value: T; error: boolean; }
type Form = {
    "state": FormItem<string>
    "city": FormItem<string>
}

export default function CityPickerView() {
    const navigate = useNavigate();
    const { setInput, toggle: toggleKeyboard, setOnChange } = useKeyboard();
    const [form, setForm] = useState<Form>({
        "state": { value: '', error: false },
        "city": { value: '', error: false }
    });

    const { states, fetchStates } = useResellersAllStates();
    const { cities, fetchCities } = useResellersCitiesByState();

    useEffect(() => {
        fetchStates();
    }, [fetchStates]);

    const setFormProperty = useCallback((prop: keyof Form, value: string | boolean) => {
        setForm(f => ({...f, [prop]: { value: value, error: f[prop].error }}));
    }, [setForm]);
    const setFormError = useCallback((prop: keyof Form, error: boolean) => {
        setForm(f => ({...f, [prop]: { value: f[prop].value, error: error }}));
    }, [setForm]);

    const canGoToResellers = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
        const schema: Record<keyof Form, boolean> = {
            state: form.state.value !== "" && states.includes(form.state.value),
            city: form.city.value !== "" && cities.includes(form.city.value)
        }

        let isValid = true;
        Object.entries(schema).forEach(([key, value]) => {
            setFormError(key as keyof Form, !value);

            if (!value)
                isValid = false;
        });

        if (!isValid) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, [setFormError, form, states, cities])

    return (
        <>
            <Header onPreviousClick={() => navigate('/choose')} />
            <main className="city-picker-container">
                <DropDownSearch
                    search={form.state.value}
                    placeholder="Digite um estado..."
                    error={form.state.error.toString()}
                    options={states.map(stateName => ({
                        name: stateName,
                        value: stateName
                    }))}
                    onSelected={(data: DropDownData) => {
                        setInput(data.name)
                        fetchCities(data.name)
                    }}
                    onClosing={() => toggleKeyboard(false)}
                    onFocus={(event: FocusEvent<HTMLInputElement>) => {
                        toggleKeyboard(true);
                        setOnChange((input: string) => {
                            setFormProperty("state", input);
                        });
                        setInput(event.target.value);
                    }}
                />

                <DropDownSearch
                    search={form.city.value}
                    placeholder="Digite uma cidade..."
                    error={form.city.error.toString()}
                    options={cities.map(cityName => ({
                        name: cityName,
                        value: cityName
                    }))}
                    onSelected={(data: DropDownData) => setInput(data.name)}
                    onClosing={() => toggleKeyboard(false)}
                    onFocus={(event: FocusEvent<HTMLInputElement>) => {
                        toggleKeyboard(true)
                        setOnChange((input: string) => {
                            setFormProperty("city", input);
                        });
                        setInput(event.target.value);
                    }}
                />
            </main>
            <Footer
                text="Avançar"
                to='/resellers'
                onClick={canGoToResellers}
                data={{
                    state: form.state.value,
                    city: form.city.value
                }}
            />
        </>
    )
}