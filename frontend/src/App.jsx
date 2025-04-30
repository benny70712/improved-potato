import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import HomePage from './components/HomePage';
import PostsPage from './components/PostsPage';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/posts" element={<PostsPage />} />

      </Routes> 
  </Router>
  )
}

export default App
