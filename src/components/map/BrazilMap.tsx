import MapSectionPath from "./MapSectionPath.tsx";
import {useCallback, useState} from "react";
import mapPaths from "./map-paths.ts";

export default function BrazilMap() {
    const [selected, setSelected] = useState<string>('');

    const onPathClick = useCallback((title: string, abbreviation: string) => {
        setSelected(abbreviation);
        console.log("Click on ", title, abbreviation);
    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="612.51611"
            height="639.04297"
            stroke="white"
            stroke-width="1"
        >
            {Object.values(mapPaths).map(((pathInfo, index) =>
                <MapSectionPath
                    key={index}
                    path={pathInfo.path}
                    title={pathInfo.title}
                    fill={selected === pathInfo.abbreviation ? 'red' : undefined}
                    abbreviation={pathInfo.abbreviation}
                    onClick={onPathClick}
                />
            ))}
        </svg>
    );
}

