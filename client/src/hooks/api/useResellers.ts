import {useCallback, useState} from "react";
import Reseller from "../../../../shared/models/Reseller";

export default function useResellers() {
    const [resellers, setResellers] = useState<Reseller[]>([]);

    const fetchResellers = useCallback((state: string, city: string) => {
        fetch("http://localhost:3000/api/resellers", {
            method: "GET",
            body: JSON.stringify({ state, city })
        })
            .then(res => res.json())
            .then(data => setResellers(data))
    }, []);

    return {
        resellers,
        fetchResellers,
    }
}

export function useResellersAvailableCities() {
    const [cities, setCities] = useState<string[]>([]);

    const fetchCities = useCallback((state: string) => {
        fetch("http://localhost:3000/api/resellers/available-cities", {
            method: "GET",
            body: JSON.stringify({ state })
        })
            .then(res => res.json())
            .then(data => setCities(data))
    }, []);

    return {
        cities,
        fetchCities,
    }
}