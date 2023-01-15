import { memo, useEffect, useState } from "react";
import { SingleValue, StylesConfig, ActionMeta } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getAllApExams } from "../../../../../../controllers/HomeController";

const style: StylesConfig<ApExamOption, false> = {
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
        ...provided, color: 'hsl(0, 0%, 20%)', fontSize: '1.4rem', maxWidth: '200px'
    }),
    indicatorSeparator: (provided) => ({
        ...provided, backgroundColor: '#1F1F1F'
    }),
}

interface ApExamDropdownProps {
    selectApExam: ApExamOption | undefined;
    setSelectApExam: (exam: ApExamOption) => void;
}

function ApExamDropDown({ selectApExam, setSelectApExam }: ApExamDropdownProps) {
    const [apExamOptions, setApExamOptions] = useState<ApExamOption[]>([]);

    const handleChange = (option: SingleValue<ApExamOption>, actionMeta: ActionMeta<ApExamOption>) => {
        if(actionMeta.action === 'clear') {
            const dumpOption: ApExamOption = {
                value: -1,
                label: '',
                GE: [],
                courses: [],
                score: 0,
                units: 0
            }
            setSelectApExam(dumpOption)
        }
        else if(actionMeta.action === 'create-option') {
        }
        else if(option) {
            setSelectApExam(option);
        }
    }
    const handleCreateOption = (inputValue: string) => {
        let newOption = {
            label: inputValue,
            value: inputValue
        };
        setSelectApExam(newOption);
    }

    useEffect(() => {
        const fetchAllApExams = async() => {
            const res = await getAllApExams();
            setApExamOptions(res);
        }
        fetchAllApExams();
    },[]); 

    return (
        <CreatableSelect
            styles={style}
            value={selectApExam}
            options={apExamOptions}
            onChange={handleChange}
            onCreateOption={handleCreateOption}
            isClearable={true}
            formatOptionLabel={option => option.label + (option.score ? " (" + option.score + ")" : "")}
            placeholder='Create or Search Ap Exam'
        />
    )
}

export default memo(ApExamDropDown);

