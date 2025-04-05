import {useNavigate} from "react-router-dom";
import lines from '@images/lines.png'
import norton from '@images/norton.svg'
import {useCallback, useRef} from "react";
import './style.css'

export default function FormView() {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const termsCheckBoxRef = useRef<HTMLInputElement>(null);
    const offersCheckBoxRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = useCallback(() => {
        navigate("/choose")
    }, [navigate]);

    return (
        <div className="form-view-container">
            <div className="logo-container">
                <img className="logo" src={norton} alt=""/>
            </div>
            <div className="form-container">
                <div id="form-fields-container">
                    <input ref={nameInputRef} className="text-input" type="text" placeholder="Seu nome"/>
                    <input ref={emailInputRef} className="text-input" type="text" placeholder="Seu e-mail"/>
                    <input ref={phoneInputRef} className="text-input" type="text" placeholder="Seu telefone"/>
                    <div className="check-box-item">
                        <input ref={termsCheckBoxRef} type="checkbox"/>
                        <label htmlFor="terms-check-box">Termos e condições</label>
                    </div>
                    <div className="check-box-item">
                        <input ref={offersCheckBoxRef} type="checkbox"/>
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