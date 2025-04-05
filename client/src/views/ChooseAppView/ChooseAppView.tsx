import {useCallback, useState} from "react";
import shop from '@icons/shop.svg'
import catalog from '@icons/catalog.svg'
import Footer from "../../components/layout/Footer/Footer.tsx";
import Header from "../../components/layout/Header/Header.tsx";
import {useNavigate} from "react-router-dom";
import './style.css'

export default function ChooseAppView() {
    const [selectedOption, setSelectedOption] = useState<'resellers' | 'catalog'>('resellers');
    const navigate = useNavigate();

    const handleNextPageClick = useCallback(() => {
        const nextPage = selectedOption === 'resellers' ? '/city' : '/catalog';
        navigate(nextPage)
    }, [navigate, selectedOption]);

    return (
        <>
            <Header onPreviousClick={() => navigate(-1)} />
            <main>
                <div>
                    <h2>Encontre um Revendedor ou Explore Nosso Catálogo</h2>
                    <p>
                        Abaixo, escolha entre encontrar os revendedores mais próximos de
                        você ou visualizar nosso catálogo digital.
                    </p>
                </div>
                <div className="app-option-button-container">
                    <AppOptionButton
                        icon={shop}
                        text={"Busca de revendas"}
                        selected={selectedOption === 'resellers'}
                        onClick={() => setSelectedOption('resellers')}
                    />
                    <AppOptionButton
                        icon={catalog}
                        text={"Catálogo digital"}
                        selected={selectedOption === 'catalog'}
                        onClick={() => setSelectedOption('catalog')}
                    />
                </div>
            </main>
            <Footer buttonText="Avançar" onNextClick={handleNextPageClick}/>
        </>
    );
}

type AppOptionButtonProps = {
    icon: string,
    text: string,
    selected: boolean,
    onClick: () => void,
}

function AppOptionButton(props: AppOptionButtonProps) {
    return (
        <div
            onClick={props.onClick}
            className={"app-option-button" + (props.selected ? " selected" : "")}
        >
            <div className="app-option-img-container" >
                <img className="app-option-button-img" src={props.icon} alt="Button icon" />
            </div>
            <span className="app-option-button-text">{props.text}</span>
        </div>
    )
}