import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './routes/homepage/homepage.jsx';
import CreatePage from './routes/createPage/createPage.jsx';
import PostPage from './routes/postPage/postPage.jsx';
import AuthPage from './routes/authPage/authPage.jsx';
import SearchPage from './routes/searchPage/searchPage.jsx';
import ProfilePage from './routes/profilePage/profilePage.jsx';
import MainLayout from './routes/layouts/mainLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/pin/:id" element={<PostPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:username" element={<ProfilePage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
