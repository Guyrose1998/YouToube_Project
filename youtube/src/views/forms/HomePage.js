import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import LeftSideBar from '../components/LeftSideBar';
import CategoryButtons from '../components/CategoryButtons';
import VideoGrid from '../components/VideoGrid';
import OffCanvasMenu from '../components/OffCanvasMenu';
import '../../App.css';
import AddVideo from './AddVideo';

const HomePage = ({ isAuthenticated, onLogout, currentUser, users, addVideo, videos }) => { // Receive addVideo and videos as props
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const handleToggleDarkMode = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };



  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <NavigationBar
        onToggleDarkMode={handleToggleDarkMode}
        onSearch={handleSearch}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
        currentUser={currentUser}
        addVideo={addVideo} 
      />
      <OffCanvasMenu isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
      <div className="container-fluid">
        <div className='row'>
          <CategoryButtons onCategoryChange={handleCategoryChange} />
        </div>
        <div className="row">
          <LeftSideBar />
          <div className="col">
            <VideoGrid
              isDarkMode={isDarkMode}
              searchTerm={searchTerm}
              category={category}
              videos={videos} // Use videos prop here
              users={users}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
