import {useCallback} from "react";
import UserInfo from "../../../../shared/models/UserInfo";

export default function useSaveUserInfo() {
    return useCallback((user: UserInfo) => {
        return fetch('http://localhost:3000/api/users', {
            method: 'POST',
            body: JSON.stringify(user)
        });
    }, []);
}