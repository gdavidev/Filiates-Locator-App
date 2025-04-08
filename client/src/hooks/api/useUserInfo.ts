import {useCallback} from "react";
import UserInfo from "../../../../shared/models/UserInfo";

export default function useSaveUserInfo() {
    return useCallback((user: UserInfo) => {
        return fetch('http://localhost:3001/api/users/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phone,
                    "acceptedTerms": user.acceptedTerms ? 1 : 0,
                    "acceptedOffers": user.acceptedOffers ? 1 : 0,
                }
            })
        });
    }, []);
}