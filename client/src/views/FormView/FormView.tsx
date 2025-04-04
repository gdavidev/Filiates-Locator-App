import {useNavigate} from "react-router-dom";
import Footer from "@components/layout/Footer/Footer.tsx";
import './style.css'

export default function FormView() {
    const navigate = useNavigate();

    return (
        <>
        <main>
            FormView

        </main>
        <Footer buttonText="Avançar" onNextClick={() => navigate("/choose")} />
        </>
    );
}