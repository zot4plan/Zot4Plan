import { useState, useRef} from 'react';
import { useStore } from 'react-redux';
import { RootState } from '../../app/store';

function ButtonSave () {
    const [file, setFile] = useState({fileType: "json", name:"zot4plan", url: "/"});
    const doFileDownload = useRef<HTMLAnchorElement>(null);
    const store = useStore();

    const getData = () => {
        let state:RootState = store.getState()
        let years = state.store.years.allIds.map(id => 
                        state.store.years.byIds[id].map(id => 
                            state.store.sections[id]
                    ));
        return {
            selectedProgram: state.programs.selectedPrograms,
            addedCourses: state.programs.sections[state.programs.addedCourses],
            years: years as string[][][],
        }
    }

    // Create JSON file and download URL
    const createDownloadFile = async () => {
        const data = getData();
        let output = JSON.stringify(data);
        const blob = new Blob([output])
        const url = URL.createObjectURL(blob);
        setFile( prev => ({...prev, url: url }));
    } 

    // Download file and free up the storage after finishing
    const clickOnAnchor =  async () => {
        if(doFileDownload.current) {
            doFileDownload.current.click();
            URL.revokeObjectURL(file.url); // free up storage 
            setFile( prev => ({...prev, url: "/" }));
        }
    }

    const download = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await createDownloadFile();
        await clickOnAnchor();
        
    } 

    return (
        <div className="relative flex-container">    
            <button 
                className='btn' 
                onClick ={download} 
                aria-label="download your plan as a JSON file"
            >   
                Save
            </button> 

            <div style={{position: "absolute", display: "none"}}>   
                <a download={file.name + '.' + file.fileType}
                    href={file.url}
                    ref={doFileDownload}
                />
            </div>
        </div>
    )
}

export default ButtonSave;