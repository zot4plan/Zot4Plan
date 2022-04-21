import { useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import DownloadIcon from '../icon/DownloadIcon';

import ReactTooltip from "react-tooltip";

function DownloadFileButton () {
    const [file, setFile] = useState({fileType: "json", name:"zotplan", url: ""});
    const doFileDownload = useRef<HTMLAnchorElement>(null);

    /**
     * Prepare file data - get collection of data from StoreSlice 
     * Return an Object {
     *  majorName: string      // name of the major
     *  geCourses: string[][]  // list of list of courses taken by each ge categorie
     *  coursesAddByStudent: string[] // list of courses added by student
     *  years: string[][][]    // list of quarters, each quarter contains a list of courses taken in the quarter
     * }
     */
    const data = useSelector( (state:RootState) => {
        let majorName = state.store.major.name;
        let geCourses = state.store.ge.allGeIds.map(id => {
            let geSectionId = state.store.ge.byIds[id].sectionId;
            return state.store.sectionCourses[geSectionId];
        });
        let coursesAdded = state.store.sectionCourses[state.store.coursesAddByStudent.sectionId];
        let years = state.store.years.allIds.map(id => 
                        state.store.years.byIds[id].quarterIds.map(id => 
                            state.store.sectionCourses[id]
                    ));
       
        return {
            majorName: majorName,
            geCourses: geCourses as string[][],
            coursesAddByStudent: coursesAdded as string[],
            years: years as string[][][],
        }
    });

    // Create JSON file and download URL
    const createDownloadFile = async () => {
        let output = JSON.stringify({data});
        console.log(1)
        const blob = new Blob([output])
        const url = URL.createObjectURL(blob);
        setFile( prev => ({...prev, url: url }));
    }

    // Download file and free up the storage after finishing
    const clickOnAnchor =  async () => {
        if(doFileDownload.current) {
            doFileDownload.current.click();
            console.log(2)
            console.log(file.url);
            URL.revokeObjectURL(file.url); // free up storage 
            setFile( prev => ({...prev, url: "" }));
        }
    }

    const download = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await createDownloadFile();
        await clickOnAnchor();
    }

    return (
    <div className="relative flex justify-center item-center">  
        <button data-tip data-for='downloadTip' className='btn-outlined-header' onClick ={download}>
            <DownloadIcon/>
        </button>
        <ReactTooltip id="downloadTip" place="bottom" effect="solid">
            Download File
        </ReactTooltip>

        <div className="absolute" style={{display: "none"}}>   
            <a download={file.name + '.' + file.fileType}
               href={file.url}
               ref={doFileDownload}
            />
        </div>
    </div>
    )
}

export default DownloadFileButton;