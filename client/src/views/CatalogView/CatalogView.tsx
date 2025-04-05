import {useLayoutEffect, useRef, useState} from "react";
import HTMLFlipBook from "react-pageflip";
import useDeviceWidth from "../../hooks/useDeviceWidth.ts";
import {DeviceWidthBreakpoints} from "../../hooks/useDeviceWidth.ts";
import './style.css'
import {useNavigate} from "react-router-dom";

const images = import.meta.glob("./pages/*");

export default function CatalogView() {
    const navigate = useNavigate();
    const [loadedImages, setLoadedImages] = useState<string[]>([])
    const book = useRef(null);
    const { breakpoint } = useDeviceWidth();

    useLayoutEffect(() => {
        const loaders = Object.values(images)
        const loadersPromises = loaders.map(async loader => await loader());

        Promise.all(loadersPromises)
            .then(res => {
                const paths = (res as { "default": string }[])
                    .map(r => r.default);
                setLoadedImages(paths);
            });
    }, []);

    return (
        <main className="catalog-container">
            <button id="return-btn" onClick={() => navigate('/choose')}>
                ⬅ Retornar
            </button>

            <HTMLFlipBook
                ref={book}
                className="unselectable"
                style={{}}
                startPage={0}
                size={"fixed"}
                width={320}
                height={460}
                minWidth={320}
                minHeight={460}
                maxWidth={320}
                maxHeight={460}
                drawShadow={true}
                flippingTime={300}
                usePortrait={breakpoint < DeviceWidthBreakpoints.MD}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.3}
                showCover={true}
                mobileScrollSupport={true}
                clickEventForward={false}
                useMouseEvents={true}
                swipeDistance={200}
                showPageCorners={true}
                disableFlipByClick={false}
            >
                {loadedImages.length > 0 &&
                    loadedImages.map((image, index) => (
                        <div key={index} className="page">
                            <img src={image} alt={"Página " + index}/>
                        </div>
                    ))
                }
            </HTMLFlipBook>

            <div className="controls">
                <button id="prev" onClick={() => book.current && book.current.pageFlip().flipPrev()}>
                    ⬅ Anterior
                </button>
                <button id="next" onClick={() => book.current && book.current.pageFlip().flipNext()}>
                    Próxima ➡
                </button>
            </div>
        </main>
    );
}