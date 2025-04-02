import {ChangeEvent, ChangeEventHandler, useMemo, useRef, useState} from "react";
import searchIcon from '@icons/search.svg'
import './style.css'

export type DropDownData = {
    name: string;
    value: string;
}
type DropDownSearchProps = {
    search: string;
    options: DropDownData[];
    onSelected?: (data: DropDownData) => void;
    onClick?: () => void;
    onInputChanged?: ChangeEventHandler<HTMLInputElement>;
}

export default function DropDownSearch(props: DropDownSearchProps) {
    const [open, setOpen] = useState<boolean>(false);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() => {
        const searchTerm = props.search.toLowerCase();
        return props.options.filter(({name}): boolean => name.toLowerCase().indexOf(searchTerm) > -1)
    }, [props.search]);

    return (
        <div ref={dropdownRef} className="drop-down-search">
            <div ref={inputContainerRef} className='drop-down-search-input-container'>
                <img className='drop-down-search-icon' src={searchIcon} alt='search' />
                <input
                    type="text"
                    className='drop-down-search-input'
                    value={props.search}
                    onClick={() => {
                        props.onClick?.();
                        setOpen(true);
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        props.onInputChanged && props.onInputChanged(e);
                        setOpen(true);
                    }}
                />
            </div>

            <div
                style={{ width: (inputContainerRef.current && inputContainerRef.current.offsetWidth) || undefined }}
                className={'drop-down-search-options-container' + (open && filteredOptions.length > 0 ? ' open' : '')}
            >
                {filteredOptions.length > 0 && filteredOptions.map((option, index) => (
                    <button
                        key={index}
                        className='drop-down-search-option'
                        value={option.value}
                        onClick={() => {
                            props.onSelected?.(option);
                            setOpen(false);
                        }}
                    >
                        {option.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

// useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//             setOpen(false);
//         }
//     }
//
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//     };
// }, []);