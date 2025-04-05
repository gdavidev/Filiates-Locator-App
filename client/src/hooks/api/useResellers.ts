import {useCallback, useState} from "react";
import Reseller from "../../../../shared/models/Reseller";

export default function useResellers() {
    const [resellers, setResellers] = useState<Reseller[]>([]);

    const fetchResellers = useCallback((state: string, city: string) => {
        fetch("http://localhost:3000/api/resellers?" + new URLSearchParams({
            "state": state,
            "city": city,
        }))
            .then(res => res.json())
            .then(data => setResellers(data.resellers))
    }, []);

    return {
        resellers,
        fetchResellers,
    }
}

export function useResellersAllStates() {
    const [states, setStates] = useState<string[]>([]);

    const fetchStates = useCallback(() => {
        fetch("http://localhost:3000/api/resellers/all-states")
            .then(res => res.json())
            .then(data => setStates(data.states.toSorted()))
    }, []);

    return {
        states,
        fetchStates,
    }
}

export function useResellersCitiesByState() {
    const [cities, setCities] = useState<string[]>([]);

    const fetchCities = useCallback((state: string) => {
        fetch("http://localhost:3000/api/resellers/cities-by-state?" + new URLSearchParams({
                "state": state,
            }))
            .then(res => res.json())
            .then(data => setCities(data.cities.toSorted()))
    }, []);

    return {
        cities,
        fetchCities,
    }
}