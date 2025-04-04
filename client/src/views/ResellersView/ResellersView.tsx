import {useMemo} from "react";
import useKeyboard from "@hooks/useKeyboard.ts";
import Header from "@components/layout/Header/Header.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";
import {useNavigate} from "react-router-dom";
import './style.css';

interface Company {
    name: string;
    address: string;
    phone: string;
}

const companies: Company[] = [
    {
        name: "DISTRIBUIDORA SAFARI LTDA",
        address: "Rua Grecco, 683 Alto Da Mooca, 03373-000, Brasil",
        phone: "(11) 6911-9888",
    },
    {
        name: "SINAPAR COMÉRCIO DE PARAFUSOS",
        address: "Av. Vila Ema 3220 V.Guarani, 03282-000, Brasil",
        phone: "(55) 4518-1828",
    },
    {
        name: "L.S. FERRAMENTAS LTDA.",
        address: "Av. Vila Ema 3220 V.Guarani, 03282-000, Brasil",
        phone: "(55) 4518-1828",
    },
];

export default function ResellersView() {
    const { input, setInput, toggle: toggleKeyboard } = useKeyboard();
    const navigate = useNavigate();
    // const locationState = useLocation().state;

    const filteredCompanies = useMemo(() => {
        return companies.filter((company) =>
            company.name.toLowerCase().includes(input.toLowerCase()) ||
            company.address.toLowerCase().includes(input.toLowerCase())
        );
    }, [input]);

    return (
        <>
            <Header onPreviousClick={() => navigate(-1)} />
            <main className="container">
                {/*<h2>{locationState.city} - {locationState.stateAbbreviation}</h2>*/}
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={input}
                    onClick={() => toggleKeyboard(true)}
                    onChange={(e) => setInput(e.target.value)}
                    className="search-input"
                />
                {filteredCompanies.map((company, index) => (
                    <div key={index} className="card">
                        <h3>{company.name}</h3>
                        <p>{company.address}</p>
                        <p>{company.phone}</p>
                    </div>
                ))}
            </main>
            <Footer buttonText="Realizar nova consulta" onNextClick={() => navigate('/choose')} />
        </>
    );
}