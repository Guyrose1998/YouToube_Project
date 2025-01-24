import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/VideoCard.css';

const VideoCard = ({ title, thumbnail, publisher, views, publishedDate }) => {


  return (
    <div className="card h-100">
      <img src={thumbnail} className="card-img-top" alt={title} />
      <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{publisher}</p>
                    <p className="card-text">
                        {views} views • {publishedDate}
                    </p>
      </div>
    </div>
  );
};

export default VideoCard;
