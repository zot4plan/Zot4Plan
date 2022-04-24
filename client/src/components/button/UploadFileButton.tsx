import { ChangeEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchMajorByFile } from '../../api/FetchData';
import UploadIcon from '../icon/UploadIcon';

import ReactTooltip from "react-tooltip";

function UploadFileButton () {
    const [showUploadCard, setShowUploadCard] = useState(false);
    const [file, setFile] = useState({content: "", name: ""});

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
        <div id="upload">
            <button  className='btn-primary' 
                onClick={handleOnClick}
                data-tip data-for="uploadTip"
                aria-label='Open upload file card'
            >
                <UploadIcon/>
            </button>
            <ReactTooltip id="uploadTip" place="bottom" effect="solid">
                Upload File
             </ReactTooltip>

            {/* upload-card */}
            <div id="upload-card" 
                className="absolute"
                style={{display: showUploadCard? "block":" none"}}
            >   
                <div className="relative flex justify-center item-center"
                    style={{margin: '1rem 2rem 0.5rem 2rem'}}
                >
                    <input id="upload-input"
                        type="file" 
                        name="uploadFile"
                        multiple={false}
                        accept=".json"
                        onChange={changeHandler}
                    />
                    <button id="upload-btn" aria-label='browse local file'>
                        Upload
                    </button>
                </div>
                <p style={{textAlign:'center', fontSize:'1.2rem', color: '#307ABB', marginBottom: '1rem'}}>
                    Only JSON files
                </p>

                <p style={{height: '1.6rem', width: '100%', textAlign: 'center', textDecoration:'underline'}}>
                    {file.name}
                </p>

                <div className="flex justify-center item-center"
                    style={{margin: '1rem 4rem', height:'3.6rem'}}
                > 
                    <button id="import-btn" onClick={handleOnSubmit} arial-label='Import file'> Import </button>
                </div>
            </div>
        </div>
    )
}

export default UploadFileButton;