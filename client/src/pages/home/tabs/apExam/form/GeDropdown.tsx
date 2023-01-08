import { memo } from "react";
import Select, { OnChangeValue, StylesConfig } from 'react-select';

const style: StylesConfig<OptionType, true> = {
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

const geOptions: OptionType[] = [
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

interface GeDropdownProps {
    selectGe: OptionType[];
    setSelectGe: (ge: OptionType[]) => void;
}

function GeDropdown({ selectGe, setSelectGe }: GeDropdownProps) {
    const handleChange = (option: OnChangeValue<OptionType, true>) => {
        setSelectGe(option as OptionType[]);
    }

    return (
        <Select
            styles={style}
            isMulti
            value={selectGe}
            options={geOptions}
            onChange={handleChange}
            placeholder="Select GE Category"
            isOptionDisabled={() => selectGe.length >= 2}
        />
    )
}

export default memo(GeDropdown);

