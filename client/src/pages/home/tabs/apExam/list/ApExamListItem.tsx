import { memo } from "react";
import { useDispatch } from 'react-redux';
import { removeApExam } from '../../../../../store/slices/CourseSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { getDeptFromCourse } from '../../../../../helpers/helpers';
import Xmark from "../../../../../components/icon/Xmark";
import ReactTooltip from "react-tooltip";
import "./ApExamListItem.css";

interface ApExamListItemProps {
    exam: ApExamType;
    index: number;
}

function ApExamListItem({ exam, index }: ApExamListItemProps) {
    const { name, courses, GE, units, score } = exam
    const geList = GE.join(', ')
    const coursesList = courses.join(', ')
    const colors = useSelector((state: RootState) => courses.length 
        ? state.course.depts.byIds[getDeptFromCourse(courses[0])]
        : ['#AFD3E9', '#70ADD7', '#3688BF']);
    const dispatch = useDispatch()
    const handleRemoveApExam = () => { dispatch(removeApExam(index)) }

    return (
        <li 
            className='flex-container ap-exam-item-container' 
            data-tip data-for={name} 
            style={{ backgroundColor: colors[0], borderColor: colors[2] }}
        >
            <p> {name} </p>
            <button className='remove-btn' onClick={handleRemoveApExam}>
                <Xmark />
            </button>

            <ReactTooltip
                arrowColor={colors[1]}
                className='exam-tooltip'
                backgroundColor={colors[2]}
                borderColor={colors[1]}
                id={name}
                place="top"
                effect="solid"
            >
                <h1>{name}</h1>
                {score > 0 && <div> <span className='text-bold'>Min Score: </span> { score } </div>}
                {courses.length > 0 
                && <div> 
                    <span className='text-bold'> {courses.length > 1 ? 'Classes:' : 'Class:'} </span> { coursesList } 
                </div>}
                {GE.length > 0 && <div> <span className='text-bold'>GE: </span> { geList } </div>}
                {units > 0 && <div> <span className='text-bold'>Credits Earned: </span> { units } </div>}
            </ReactTooltip>
        </li>
    )
}

export default memo(ApExamListItem);