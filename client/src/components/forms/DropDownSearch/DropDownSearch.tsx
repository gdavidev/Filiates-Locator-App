import {ChangeEvent, FocusEvent, ChangeEventHandler, useEffect, useMemo, useRef, useState} from "react";
import searchIcon from '@icons/search.svg'
import useKeyboard from "../../../hooks/useKeyboard.ts";
import './style.css'

export type DropDownData = {
    name: string;
    value: string;
}
type DropDownSearchProps = {
    search: string;
    options: DropDownData[];
    placeholder?: string;
    onSelected?: (data: DropDownData) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onInputChanged?: ChangeEventHandler<HTMLInputElement>;
    onClosing?: () => void;
}

const DropDownSearch = (
    props: DropDownSearchProps
) => {
    const [open, setOpen] = useState<boolean>(false);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { ref: keyboardRef } = useKeyboard();

    const filteredOptions: DropDownData[]  = useMemo(() => {
        const sanitized = (value: string) => {
            return value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        }

        const searchTerm = sanitized(props.search);
        return props.options.filter(opt => sanitized(opt.name).indexOf(searchTerm) > -1)
    }, [props.options, props.search]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!dropdownRef.current!.contains(event.target as Node) &&
                !keyboardRef.current!.keyboardDOM.contains(event.target as Node))
            {
                props.onClosing?.();
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef, keyboardRef, props]);

    return (
        <div ref={dropdownRef} className="drop-down-search">
            <div ref={inputContainerRef} className='drop-down-search-input-container'>
                <img className='drop-down-search-icon' src={searchIcon} alt='search'/>
                <input
                    type="text"
                    placeholder={props.placeholder}
                    className='drop-down-search-input'
                    value={props.search}
                    onFocus={(event: FocusEvent<HTMLInputElement>) => {
                        props.onFocus?.(event);
                        setOpen(true);
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        props.onInputChanged?.(e);
                        setOpen(true);
                    }}
                />
            </div>

            <div
                style={{width: (inputContainerRef.current && inputContainerRef.current.offsetWidth) || undefined}}
                className={'drop-down-search-options-container' + (open && filteredOptions.length > 0 ? ' open' : '')}
            >
                {filteredOptions.length > 0 && filteredOptions.map((option, index) => (
                    <button
                        key={index}
                        className='drop-down-search-option'
                        value={option.value}
                        onClick={() => {
                            props.onSelected?.(option);
                            props.onClosing?.();
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

export default DropDownSearch;
