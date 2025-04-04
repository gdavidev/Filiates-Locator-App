import {useEffect} from "react";

export default function useOnPageLoaded(callback: () => void, deps: object[] = []) {
    useEffect(() => {
        if (document.readyState === 'complete') {
            callback();
        } else {
            window.addEventListener('load', () => {
                window.removeEventListener('load', callback);
                callback();
            }, false);
            return () => window.removeEventListener('load', callback);
        }
    }, [callback, ...deps]);
}