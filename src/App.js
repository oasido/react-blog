// DONE: Add logout route
// DONE: Connect everything to MongoDB instead of json-server
// DONE: Reverse blogs so that new posts would be at the top
// DONE: Add server side checks to see if a user tries to delete other users' posts, make sure deletion only works on his posts
// DONE: Add profile pictures
// DONE: Beautify home page
// DONE: Add sorting feature
// DONE: Beautify post creation page
// DONE: Beautify post itself page
// DONE: Make pinned messages go on top
// TODO: Fix avatars so that they will show the correct ones for users
// TODO: Add user settings page
// TODO: Add commenting system
// TODO: Add profile page
// TODO: Add admin page where you can pin posts & manage users (maybe add canPost in user model)
// TODO: Add markdown support for adding blogs, pictures in blog
// TODO: Add edit functionality
// MINOR: Navbar hide create post button when on create post page, show Create Post as text
// MINOR: Rearrange every component into subfolders
// MINOR: Add minimum user/password length
// MINOR: Ternary operator if DB is off

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import BlogItself from './components/BlogItself';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  const [user, setUser] = useState({ isAuthenticated: false });

  useEffect(() => {
    const loginCheckFetch = () => {
      fetch('/api/session', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
      return user;
    };
    loginCheckFetch();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar user={user} />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<Create user={user} />} />
            <Route exact path="/login" element={<Login user={user} />} />
            <Route exact path="/logout" element={<Logout user={user} />} />
            <Route exact path="/register" element={<Register user={user} />} />
            <Route path="/blogs/:id" element={<BlogItself user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
