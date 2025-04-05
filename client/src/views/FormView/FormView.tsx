import TextInput from "../../components/forms/TextInput/TextInput.tsx";
import {useNavigate} from "react-router-dom";
import lines from '@images/lines.png'
import norton from '@images/norton.svg'
import {useCallback, useState, ChangeEvent, FocusEvent, useEffect} from "react";
import './style.css'
import useKeyboard from "../../hooks/useKeyboard.ts";
import useSaveUserInfo from "../../hooks/api/useUserInfo.ts";
import UserInfo from "../../../../shared/models/UserInfo.ts";

type FormItem<T> = { value: T; error: boolean; }
type Form = {
    "name": FormItem<string>
    "email": FormItem<string>
    "phone": FormItem<string>
    "acceptedTerms": FormItem<boolean>
    "acceptedOffers": FormItem<boolean>
}

export default function FormView() {
    const { ref: keyboardRef, setInput, setOnChange, toggle: toggleKeyboard } = useKeyboard();
    const [form, setForm] = useState<Form>({
        name: { value: '', error: false },
        email: { value: '', error: false },
        phone: { value: '', error: false },
        acceptedTerms: { value: false, error: false },
        acceptedOffers: { value: false, error: false },
    })

    const navigate = useNavigate();
    const saveUser = useSaveUserInfo();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!keyboardRef.current!.keyboardDOM.contains(event.target as Node))
                toggleKeyboard(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [toggleKeyboard, keyboardRef]);

    const setFormProperty = useCallback((prop: keyof Form, value: string | boolean) => {
        setForm(f => ({...f, [prop]: { value: value, error: f[prop].error }}));
    }, [setForm]);
    const setFormError = useCallback((prop: keyof Form, error: boolean) => {
        setForm(f => ({...f, [prop]: { value: f[prop].value, error: error }}));
    }, [setForm]);

    const handleSubmit = useCallback(() => {
        const schema = {
            name: form.name.value !== "",
            email: form.email.value !== ""
                && form.email.value.split('@').length === 2
                && form.email.value.indexOf(' ') === -1,
            phone: form.phone.value !== ""
                && RegExp(/^\d{8,11}$/).test(form.phone.value),
            acceptedTerms: form.acceptedTerms.value
        }

        let isValid = true;
        Object.entries(schema).forEach(([key, value]) => {
            setFormError(key as keyof Form, !value);
            console.log(key, !value)
            if (!value)
                isValid = false;
        });

        if (isValid) {
            saveUser(new UserInfo(
                0,
                form.name.value,
                form.email.value,
                form.phone.value,
                form.acceptedTerms.value,
                form.acceptedOffers.value,
            )).then(() => console.log("User sent"))
            navigate("/choose")
        }
    }, [saveUser, setFormError, form, navigate]);

    return (
        <div className="form-view-container">
            <div className="logo-container">
                <img className="logo" src={norton} alt=""/>
            </div>
            <div className="form-container">
                <div id="form-fields-container">
                    <TextInput
                        value={form.name.value}
                        error={form.name.error.toString()}
                        onFocus={(event: FocusEvent<HTMLInputElement>) => {
                            toggleKeyboard(true);
                            setOnChange((input: string) => setFormProperty("name", input));
                            setInput(event.target.value);
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormProperty("name", e.target.value)}
                        placeholder="Seu nome"
                    />
                    <TextInput
                        value={form.email.value}
                        error={form.email.error.toString()}
                        onFocus={(event: FocusEvent<HTMLInputElement>) => {
                            toggleKeyboard(true);
                            setOnChange((input: string) => setFormProperty("email", input));
                            setInput(event.target.value);
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormProperty("email", e.target.value)}
                        placeholder="Seu e-mail"
                    />
                    <TextInput
                        value={form.phone.value}
                        error={form.phone.error.toString()}
                        onFocus={(event: FocusEvent<HTMLInputElement>) => {
                            toggleKeyboard(true);
                            setOnChange((input: string) => setFormProperty("phone", input));
                            setInput(event.target.value);
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormProperty("phone", e.target.value)}
                        placeholder="Seu telefone"
                    />
                    <div className={"check-box-item" + (form.acceptedTerms.error ? " has-error" : '')}>
                        <input
                            checked={form.acceptedTerms.value}
                            onChange={() => {
                                setFormProperty("acceptedTerms", !form.acceptedTerms.value)
                            }}
                            type="checkbox"/>
                        <label htmlFor="terms-check-box">Termos e condições</label>
                    </div>
                    <div className="check-box-item">
                        <input
                            checked={form.acceptedOffers.value}
                            onChange={() => {
                                setFormProperty("acceptedOffers", !form.acceptedOffers.value)
                            }}
                            type="checkbox"/>
                        <label htmlFor="offers-check-box">
                            Aceito que a Norton me envie novidades e ofertas
                        </label>
                    </div>
                </div>

                <input className="btn" onClick={handleSubmit} type="button" value="Confirmar" />
            </div>
            <div className="footer-container">
                <img className="lines" src={lines} alt=""/>
            </div>
        </div>
);
}