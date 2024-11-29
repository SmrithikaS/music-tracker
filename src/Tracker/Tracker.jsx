import React, { useState, useEffect } from 'react';
import './Tracker.css';

const Tracker = ({ userId }) => {
  const [audioFiles, setAudioFiles] = useState([]);
console.log(userId)
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/files?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.files) {
            setAudioFiles(data.files);
          } else {
            setAudioFiles([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching audio files:", error);
          setAudioFiles([]);
        });
    }
  }, [userId]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("audio", selectedFile);
    formData.append("userId", userId);

    fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("File uploaded successfully");
          return fetch(`http://localhost:8080/files?userId=${userId}`);
        } else {
          throw new Error("Failed to upload file");
        }
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.files) {
          setAudioFiles(data.files);
        }
      })
      .catch((error) => console.error("Error uploading file:", error));
  };
  
  const handleDelete = (fileName) => {
    fetch(`http://localhost:8080/delete?userId=${userId}&fileName=${fileName}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('File deleted successfully');
          setAudioFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
        } else {
          throw new Error('Failed to delete file');
        }
      })
      .catch((error) => console.error('Error deleting file:', error));
  };

  return (
    <div className="tracker">
      <div className="description">
        <p>Track your progress and stay motivated by uploading and reviewing your practice recordings daily.</p>
      </div>
      <div className="file">
        <label htmlFor="upload" className="upload-label">
          Upload
        </label>
        <input
          id="upload"
          type="file"
          onChange={handleFileChange}
          className="upload-input"
        />
      </div>
      <h2>Uploaded Files</h2>
      <div className='files-list'>
        {audioFiles && audioFiles.length > 0 ? (
          audioFiles.map((fileName) => (
            <div key={fileName} className='file-box'>
                <p>{fileName}</p>
              <audio controls>
                <source src={`http://localhost:8080/audio/${userId}/${fileName}`} />
              </audio>
              <button onClick={() => handleDelete(fileName)} className="delete-btn">Delete</button>
            </div>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
      
    </div>
  );
};

export default Tracker;

