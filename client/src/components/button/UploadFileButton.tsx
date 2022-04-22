import { ChangeEvent, useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { fetchMajorByFile } from '../../features/FetchData';
import UploadIcon from '../icon/UploadIcon';

import ReactTooltip from "react-tooltip";

function UploadFileButton () {
    const [showUploadCard, setShowUploadCard] = useState(false);
    const [file, setFile] = useState({content: "", name: ""});
    const doUploadFile = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            const uploadFile = event.target.files[0];

            if(uploadFile) {
                const fileReader = new FileReader();
                fileReader.onload = event => {
                    if(event.target)  {
                        // save file content as string
                        console.log(event);
                        setFile({content: event.target.result as string, name: uploadFile.name});
                    }
                };

                fileReader.readAsText(event.target.files[0], "UTF-8");
            }
        }
    }

    const handleOnClick = ( e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setShowUploadCard(!showUploadCard)
    }

    const handleOnSubmit = ( e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(fetchMajorByFile({data: file.content}));
    }

    return (
        <div id="upload" className="relative flex justify-center item-center"
             style={{zIndex: '2'}}
        >
            <button data-tip data-for="uploadTip" className='btn-outlined-header' onClick={handleOnClick}>
                <UploadIcon/>
            </button>
            <ReactTooltip id="uploadTip" place="bottom" effect="solid">
                Upload File
             </ReactTooltip>

            <div id="upload-card" 
                className="absolute"
                style={{display: showUploadCard? "block":" none"}}
            >   
                <div className="relative flex justify-center item-center"
                    style={{margin: '1rem 2rem 0.5rem 2rem'}}
                >
                    <input className="relative"
                        id="upload-input"
                        type="file" 
                        name="uploadFile"
                        multiple={false}
                        accept=".json"
                        onChange={changeHandler}
                    />
                    <button id="upload-btn" className="absolute">
                        Upload
                    </button>
                </div>
                <p style={{textAlign:'center', fontSize:'1.2rem', color: '#307ABB', marginBottom: '1rem'}}>
                    Only JSON files
                </p>

                <p style={{height: '2rem', width: '100%', textAlign: 'center', textDecoration:'underline'}}>
                    {file.name}
                </p>

                <div className="flex justify-center item-center"
                    style={{margin: '1rem 4rem', height:'3.6rem'}}
                > 
                    <button id="import-btn" onClick={handleOnSubmit}> Import </button>
                </div>
            </div>
        </div>
    )
}

export default UploadFileButton;