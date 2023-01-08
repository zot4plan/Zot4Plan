import { memo } from "react";
import Select, { OnChangeValue, StylesConfig } from 'react-select';


const style: StylesConfig<GeOptionType, true> = {
    control: (provided) => ({
        ...provided,
        width: '100%',
        borderColor: '#1F1F1F',
        borderRadius: '18px',
        "&:hover": {
            borderColor: '#1F1F1F',
        }
    }),
    valueContainer: (provided) => ({
        ...provided, cursor: 'text',
    }),
    placeholder: (provided) => ({
        ...provided, color: '#1F1F1F',
    }),
    indicatorSeparator: (provided) => ({
        ...provided, backgroundColor: '#1F1F1F'
    }),
}

interface GeOptionType { value: string, label: string }
interface GeDropdownProps {
    selectGe: GeOptionType[];
    setSelectGe: (ge: GeOptionType[]) => void;
}
function GeDropdown({ selectGe, setSelectGe }: GeDropdownProps) {
    const ge_list: GeOptionType[] = [
        { value: "IA", label: "IA" },
        { value: "IB", label: "IB" },
        { value: "II", label: "II" },
        { value: "III", label: "III" },
        { value: "IV", label: "IV" },
        { value: "VA", label: "VA" },
        { value: "VB", label: "VB" },
        { value: "VI", label: "VI" },
        { value: "VII", label: "VII" },
        { value: "VIII", label: "VIII" },
    ]

    const handleChange = (option: OnChangeValue<GeOptionType, true>) => {
        setSelectGe(option as GeOptionType[]);
    }


    return (

        <Select
            styles={style}
            isMulti
            value={selectGe}
            options={ge_list}
            onChange={handleChange}
            placeholder="Select GE Category"
            isOptionDisabled={() => selectGe.length >= 2}
        />

    )
}

export default memo(GeDropdown);

