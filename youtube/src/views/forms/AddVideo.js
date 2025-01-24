import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddVideo.css';
import logo from '../assets/YouTube_Logo_2017.svg';

const AddVideo = ({ addVideo, currentUser }) => {
  const [videoName, setVideoName] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const navigate = useNavigate();

  const formatPublishedDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      const diffWeeks = Math.floor(diffDays / 7);
      return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoName || !file) {
      setError('Both fields are required.');
      return;
    }
    if (!file.type.startsWith('video/')) {
      setError('Please upload a video file.');
      return;
    }
    if (!currentUser) {
      setError('User is not logged in.');
      return;
    }
    setError('');

    // Create a video element
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      video.currentTime = 5; 

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        const aspectRatio = video.videoWidth / video.videoHeight;
        const thumbnailWidth = 320;
        const thumbnailHeight = thumbnailWidth / aspectRatio; 

        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const thumbnailDataUrl = canvas.toDataURL('image/png', 0.8); // High quality PNG

        setThumbnail(thumbnailDataUrl);
        const uploadDate = new Date();

        const newVideo = {
          id: Date.now(), // Unique ID
          title: videoName,
          thumbnail: thumbnailDataUrl,
          publisher: `${currentUser.firstName} ${currentUser.lastName}`,
          views: 0,
          publishedDate: formatPublishedDate(uploadDate),
          videoFile: URL.createObjectURL(file),
          file // Store the actual file for future use
        };

        addVideo(newVideo); 
        navigate('/');
      };
    };
  };

  return (
    <div className="add-video-container">
      <div className="add-video-card">
        <div className="add-video-card-body">
          <div className="add-video-card-title">
            <img src={logo} alt="logo" className="header_logoImage" />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group add-video-input-group">
              <label htmlFor="video-name">Video Name</label>
              <input
                type="text"
                id="video-name"
                name="video-name"
                placeholder="Enter video name"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
              />
            </div>
            <div className="input-group add-video-input-group">
              <div className="file-input-wrapper add-video-file-input-wrapper">
                <input 
                  type="file"
                  id="file-input"
                  name="file-input"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary add-video-btn">Add New Video</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
