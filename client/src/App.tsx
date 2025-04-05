import {createBrowserRouter, Outlet, RouterProvider, useNavigate} from "react-router-dom";
import CityPickerView from "./views/CityPickerView/CityPickerView.tsx";
import KeyboardContextProvider from "./context/KeyboardContextProvider.tsx";
import ResellersView from "./views/ResellersView/ResellersView.tsx";
import StatePickerView from "./views/StatePickerView/StatePickerView.tsx";
import ChooseAppView from "./views/ChooseAppView/ChooseAppView.tsx";
import FormView from "./views/FormView/FormView.tsx";
import CatalogView from "./views/CatalogView/CatalogView.tsx";
import {useEffect, useRef} from "react";
import './App.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <FormView />,
    }, {
        element: <App />,
        children: [
            { path: "/choose", element: <ChooseAppView /> },
            { path: "/state", element: <StatePickerView /> },
            { path: "/city", element: <CityPickerView /> },
            { path: "/resellers", element: <ResellersView /> }
        ]
    }, {
        path: "/catalog",
        element: <CatalogView />
    }
]);

export default function Root() {
    return (
        <KeyboardContextProvider>
            <RouterProvider router={router} />
        </KeyboardContextProvider>
    );
}

function App() {
    const navigate = useNavigate();
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        const resetTimer = () => {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                navigate("/")
            }, 30000); // Retornar para a pagina principal após 30seg de inatividade
        }
        resetTimer();

        document.addEventListener('click', resetTimer)
        return () => document.removeEventListener('click', resetTimer)
    })

    return (
        <Outlet />
    )
}