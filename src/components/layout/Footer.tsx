type FooterProps = {
    onNextClick?: () => void;
}

export default function Footer(props: FooterProps) {
    return (
        <footer>
            <button onClick={props.onNextClick} />
        </footer>
    )
}