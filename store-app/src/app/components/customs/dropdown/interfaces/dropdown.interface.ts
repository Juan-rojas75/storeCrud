export interface DropdownProps {
    options: {value: string, label: string}[];
    onSelect: (item: {value: string, label: string}) => void,
}