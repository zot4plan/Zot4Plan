import { ChangeEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchProgramByFile } from '../../api/FetchData';

import './ButtonLoad.css'

function ButtonLoad () {
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
        dispatch(fetchProgramByFile({data: file.content}));
    }

    return (
        <div className="flex-container" style={{position:'relative'}}>
            <button className='btn' 
                onClick={handleOnClick}
                aria-label='Open upload file card'> Load </button>

            {/* upload-card */}
            <div style={{display: showUploadCard? "block":" none"}} id="upload-card">
                <div className="flex-container"
                    style={{margin: '1rem 2rem 0.2rem 2rem', position: 'relative'}}>
                    <input 
                        id="upload-input"
                        type="file" 
                        name="uploadFile"
                        multiple={false}
                        accept=".json"
                        onChange={changeHandler}
                    />
                    <button id="upload-btn" 
                        className="flex-container" 
                        aria-label='browse local file' > Upload </button>
                </div> 

                <p style={{
                    height: '1.8rem', width: '100%', 
                    textAlign: 'center', textDecoration:'underline', 
                    overflow:'hidden', fontSize:'1.4rem'}}> {file.name} </p>

                <div className="flex-container"
                    style={{margin: '0.2rem 2rem 1rem 2rem', height:'3.6rem'}}> 
                    <button id="import-btn" 
                        onClick={handleOnSubmit} 
                        arial-label='Import file'> Import </button>
                </div>
            </div>
        </div>
    )
}

export default ButtonLoad;