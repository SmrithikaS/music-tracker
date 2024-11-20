import React, { useRef, useState } from 'react';
import './Tracker.css';
import { MdDelete } from "react-icons/md";

const Tracker = () => {
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [audioURL, setAudioURL] = useState(null);

    const handleSelectedFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);

            const url = URL.createObjectURL(file);
            setAudioURL(url);
        }
    };

    const onSelectFile = () => {
        inputRef.current.click();
    };

    const deleteFile = () => {
        setSelectedFile(null);
        setAudioURL(null);
    };

    return (
        <div className='tracker'>
            <div className='description'>
                <p>Track your progress and stay motivated by uploading and reviewing your practice recordings daily.</p>
            </div>
            <div className='file'>
                <input
                    type='file'
                    ref={inputRef}
                    onChange={handleSelectedFile}
                    style={{ display: "none" }}
                />
                <button className='file-btn' onClick={onSelectFile}>
                    Upload File
                </button>
            </div>
            {audioURL && (
                <div className='selected-file'>
                    <p>{selectedFile ? selectedFile.name : 'Audio File'}</p>
                    <audio controls src={audioURL} className='audio-player'>

                    </audio>
                    <button onClick={deleteFile}>
                        <MdDelete />
                    </button>

                </div>
            )}
        </div>
    );
};

export default Tracker;
