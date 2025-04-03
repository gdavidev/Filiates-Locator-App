import useAfterLoaded from "@hooks/useAfterLoaded.ts";
import {useLayoutEffect, useState} from "react";
import FlipBook from './scripts/init.js';
import './scripts/jquery.min.js'
import './scripts/turnjs.min.js'
import './style.css'
const images = import.meta.glob("./pages/*")

export default function CatalogView() {
    const [loadedImages, setLoadedImages] = useState<string[]>([])

    useLayoutEffect(() => {
        const loaders =  Object.values(images)
        const loadersPromises = loaders.map(async loader => await loader());

        Promise.all(loadersPromises)
            .then(res => {
                const paths = (res as {"default": string}[]).map(r => r.default);
                setLoadedImages(paths);
            });
    }, []);

    useAfterLoaded(() => {
        if (loadedImages)
            FlipBook.initialize();
    }, [loadedImages]);

    return (
        <main>
            <div className="container">
                <div id="flipbook">
                    {loadedImages.length > 0 &&
                        loadedImages.map((image, index) => (
                            <div key={index} className="page">
                                <img src={image} alt={"Página " + index}/>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="controls">
                <button id="prev">⬅ Anterior</button>
                <button id="next">Próxima ➡</button>
            </div>
        </main>
    );
}