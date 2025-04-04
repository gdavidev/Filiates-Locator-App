type MapSectionPathProps = {
    path: string
    title: string
    abbreviation: string
    fill?: string,
    onClick?: (title: string, id: string) => void
}

export default function MapSectionPath(props: MapSectionPathProps) {
    return (
        <path
            d={props.path}
            data-title={props.title}
            fill={props.fill}
            id={props.abbreviation}
            onClick={() => props.onClick?.(props.title, props.abbreviation)}
        />
    )
}