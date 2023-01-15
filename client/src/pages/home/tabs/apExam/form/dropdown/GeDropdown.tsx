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
        ...provided, color: 'hsl(0, 0%, 20%)', fontSize: '1.4rem'
    }),
    indicatorSeparator: (provided) => ({
        ...provided, backgroundColor: '#1F1F1F'
    }),
    multiValue: (provided) => ({
        ...provided, maxWidth: '150px'
    })
}

const geOptions: OptionType[] = [
    { value: "IA", label: "IA-Lower-Division Requirement" },
    { value: "IB", label: "IB-Upper-Division Requirement" },
    { value: "II", label: "II-Science and Technology" },
    { value: "III", label: "III-Social and Behavioral Sciences" },
    { value: "IV", label: "IV-Arts and Humanities" },
    { value: "VA", label: "VA-Quantitative Literacy" },
    { value: "VB", label: "VB-Formal Reasoning" },
    { value: "VI", label: "VI-Language Other Than English" },
    { value: "VII", label: "VII-Multicultural Studies" },
    { value: "VIII", label: "VIII-International/Global Issues" },
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

