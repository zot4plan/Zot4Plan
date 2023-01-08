import "./ApExamForm.css";
import ReactTooltip from "react-tooltip";
import { useDispatch } from 'react-redux';
import { removeApExam } from '../../../../store/slices/CourseSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getDeptFromCourse } from '../../../../helpers/helpers';
import Xmark from "../../../../components/icon/Xmark";

interface IApExam {
    name: string;
    courses: string[];
    GE: string[];
}

interface ApExamListItemProps {
    exam: IApExam;
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
    const handleRemoveApExam = () => {dispatch(removeApExam(index))}

    return (
        <>
            <div className='list-display' data-tip data-for={name} style={{ backgroundColor: colors[0], borderColor: colors[0] }}>
                <button className='remove-course-btn' onClick={handleRemoveApExam}>
                    <Xmark />
                </button>
                <p className='ap-name'>{name}</p>
            </div>

            <ReactTooltip
                arrowColor='#495057'
                className='examTooltip'
                id={name}
                place="top"
                effect="solid"
            >
                <div>
                    <span>
                        <span style={{ fontWeight: 'bold' }}>Covers: </span>{coursesList}
                    </span>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <span>
                        <span style={{ fontWeight: 'bold' }}>GE: </span> {geList}
                    </span>

                </div>
            </ReactTooltip>
        </>



        // {ap_exam_data.map((i: IApExam) =>
        //     <li key={i.name}>{i.name}</li>)}
        // </ul>

    )

}


export default ApExamListItem;