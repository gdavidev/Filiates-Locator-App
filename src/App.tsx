import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import CityPickerView from "./views/CityPickerView/CityPickerView.tsx";
import KeyboardContextProvider from "./context/KeyboardContextProvider.tsx";
import ResellersView from "./views/ResellersView/ResellersView.tsx";
import StatePickerView from "./views/StatePickerView/StatePickerView.tsx";
import ChooseAppView from "./views/ChooseAppView/ChooseAppView.tsx";
import FormView from "./views/FormView/FormView.tsx";
import CatalogView from "./views/CatalogView/CatalogView.tsx";
import './App.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <FormView />,
    }, {
        element: <Outlet />,
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