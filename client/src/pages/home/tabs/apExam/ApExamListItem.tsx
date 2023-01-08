import { memo } from "react";
import { useDispatch } from 'react-redux';
import { removeApExam } from '../../../../store/slices/CourseSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getDeptFromCourse } from '../../../../helpers/helpers';
import Xmark from "../../../../components/icon/Xmark";
import ReactTooltip from "react-tooltip";
import "./ApExamListItem.css";

interface ApExamListItemProps {
    exam: ApExamType;
    index: number;
}

function ApExamListItem({ exam, index }: ApExamListItemProps) {
    const { name, courses, GE } = exam
    const geList = GE.join(', ')
    const coursesList = courses.join(', ')
    const colors = useSelector((state: RootState) => state.course.depts.byIds[getDeptFromCourse(courses[0])]
        ? state.course.depts.byIds[getDeptFromCourse(courses[0])]
        : ['#AFD3E9', '#70ADD7', '#3688BF']);
    const dispatch = useDispatch()
    const handleRemoveApExam = () => { dispatch(removeApExam(index)) }

    return (
        <div 
            className='ap-exam-container' 
            data-tip data-for={name} 
            style={{ backgroundColor: colors[0] }}
        >
            <p className='ap-exam-name'> {name} </p>
            <button className='remove-btn' onClick={handleRemoveApExam}>
                <Xmark />
            </button>

            <ReactTooltip
                arrowColor='#495057'
                className='exam-tooltip'
                id={name}
                place="top"
                effect="solid"
            >
                <div>
                    <span>
                        <span style={{ fontWeight: 'bold' }}>Covers: </span> {coursesList}
                    </span>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <span>
                        <span style={{ fontWeight: 'bold' }}>GE: </span> {geList}
                    </span>
                </div>
            </ReactTooltip>
        </div>
    )
}

export default memo(ApExamListItem);