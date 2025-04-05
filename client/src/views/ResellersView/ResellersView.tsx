import {FocusEvent, ChangeEvent, useCallback, useEffect, useMemo} from "react";
import useKeyboard from "../../hooks/useKeyboard.ts";
import Header from "../../components/layout/Header/Header.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import useResellers from "../../hooks/api/useResellers.ts";
import Address from "../../../../shared/structures/Address.ts";
import TextInput from "../../components/forms/TextInput/TextInput.tsx";
import pinPointIcon from '@icons/pin-point.svg'
import phoneIcon from '@icons/phone.svg'
import './style.css';

export default function ResellersView() {
    const { input, setInput, ref: keyboardRef, toggle: toggleKeyboard } = useKeyboard();
    const navigate = useNavigate();
    const locationState = useLocation().state;

    const { resellers, fetchResellers } = useResellers();

    useEffect(() => {
        fetchResellers(locationState.state, locationState.city)

        setInput('');
    }, [setInput, fetchResellers, locationState]);

    const displayAddress = useCallback((address: Address) => {
        return `${address.address}, ${address.neighborhood}, ${address.zip}, Brasil`;
    }, []);

    const filteredResellers = useMemo(() => {
        return resellers.filter((reseller) =>
            reseller.groupName.toLowerCase().includes(input.toLowerCase()) ||
            displayAddress(reseller.address).toLowerCase().includes(input.toLowerCase())
        );
    }, [displayAddress, resellers, input]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!keyboardRef.current!.keyboardDOM.contains(event.target as Node))
                toggleKeyboard(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [toggleKeyboard, keyboardRef]);

    return (
        <>
            <Header onPreviousClick={() => navigate('/city')} />
            <main className="container">
                <h2>{locationState.state} - {locationState.city}</h2>
                <TextInput
                    value={input}
                    onFocus={(event: FocusEvent<HTMLInputElement>) => {
                        toggleKeyboard(true);
                        setInput(event.target.value);
                    }}
                    placeholder="Pesquisar..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setInput(e.target.value) }}
                />
                <div className="resellers-container">
                    {filteredResellers.map((reseller, index) => (
                        <div key={index} className="card">
                            <h3>{reseller.groupName}</h3>
                            <div className="reseller-info-icon-container">
                                <img src={pinPointIcon} alt='pin poin' />
                                <p>{displayAddress(reseller.address)}</p>
                            </div>
                            {reseller.phone &&
                                <div className="reseller-info-icon-container">
                                    <img src={phoneIcon} alt='phone' />
                                    <p>{reseller.phone}</p>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </main>
            <Footer text="Realizar nova consulta" to='/choose' />
        </>
    );
}