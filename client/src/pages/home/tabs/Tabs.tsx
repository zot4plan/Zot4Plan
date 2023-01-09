import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGE } from '../../../controllers/HomeController';
import { RootState } from '../../../store/store';
import GeneralEducation from './generalEducation/GeneralEducation';
import Program from './program/Program';
import SelectProgram from './select/SelectProgram';
import ApExam from './apExam/ApExam';
import './Tabs.css';

function Tabs() {
    const [tab, setTab] = useState(1);
    const addedCourses = useSelector((state: RootState) => state.programs.addedCourses);
    const status = useSelector((state: RootState) => state.ge.status);

    const dispatch = useDispatch();

    useEffect(() => {
        if (tab === 3 && status === 'idle')
            dispatch(getAllGE());
    }, [tab, status, dispatch]);

    return (
        <div id="tab-container">
            <ul style={{ display: "flex" }}>
                <li onClick={() => setTab(1)}
                    className={'tab flex-container round-top-left border-right ' + (tab === 1 ? "active" : "")}
                >
                    Major
                </li>

                <li onClick={() => setTab(2)}
                    className={'tab flex-container border-right ' + (tab === 2 ? "active" : "")}
                >
                    Minor
                </li>

                <li onClick={() => setTab(3)}
                    className={'tab flex-container border-right ' + (tab === 3 ? "active" : "")}
                >
                    GE
                </li>

                <li onClick={() => setTab(4)}
                    className={'tab flex-container round-top-right ' + (tab === 4 ? "active" : "")}
                >
                    AP Exam
                </li>
            </ul>

            <div style={{ display: tab === 1 || tab === 2 ? "block" : "none" }}>
                <SelectProgram key="selectProgram" isMajor={tab === 1} />
                <Program key="program" isMajor={tab === 1} addedCourses={addedCourses} />
            </div>

            <div style={{ display: tab === 3 ? "block" : "none" }}>
                <GeneralEducation />
            </div>

            <div style={{ display: tab === 4 ? "block" : "none" }}>
                <ApExam />
            </div>
        </div>
    );
}

export default memo(Tabs);