import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/VideoGrid.css';
import VideoCard from './VideoCard';

const VideoGrid = ({ searchTerm = '', category = 'All', isDarkMode, videos }) => {

  const filteredVideos = videos.filter((video) => {
    return (
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'All' || video.category === category)
    );
  });

  
  return (
    <div className={`videoGrid over-container d-flex p-3 mx-auto flex-column ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="row g-4">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <VideoCard
                title={video.title}
                thumbnail={video.thumbnail}
                publisher={video.publisher}
                views={video.views}
                publishedDate={video.publishedDate}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No videos found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGrid;
