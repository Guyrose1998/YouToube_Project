import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/forms/HomePage';
import LoginForm from './views/forms/LoginForm';
import SignUpForm from './views/forms/SignUpForm';
import AddVideo from './views/forms/AddVideo';
import usersData from './data/users.json';
import videosData from './data/videosDetails.json';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState(usersData.users);
    const [currentUser, setCurrentUser] = useState(null);
   
    const [videos, setVideos] = useState([]); // Initial empty array for videos

    useEffect(() => {
        setUsers(usersData.users);
        setVideos(videosData);
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    const addVideo = (newVideo) => {
        setVideos((prevVideos) => [...prevVideos, newVideo]);
      };


return (
  <Router>
    <Routes>
    <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} onLogout={handleLogout} currentUser={currentUser} users={users} addVideo={addVideo} videos={videos} />} />
    <Route path="/add_video" element={<AddVideo currentUser={currentUser} addVideo={addVideo} />} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} users={users}/>} />
      <Route path="/signup" element={<SignUpForm users={users} setUsers={setUsers}/>} />
    </Routes>
  </Router>
);
};

export default App;
