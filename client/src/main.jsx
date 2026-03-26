import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MainLayout from './routes/layouts/mainLayout.jsx';

/* 
import Homepage from './routes/homepage/homepage.jsx';
import CreatePage from './routes/createPage/createPage.jsx';
import PostPage from './routes/postPage/postPage.jsx';
import AuthPage from './routes/authPage/authPage.jsx';
import SearchPage from './routes/searchPage/searchPage.jsx';
import ProfilePage from './routes/profilePage/profilePage.jsx';
 */

const Homepage = React.lazy(() => import('./routes/homepage/homepage.jsx'));
const CreatePage = React.lazy(() => import('./routes/createPage/createPage.jsx'));
const PostPage = React.lazy(() => import('./routes/postPage/postPage.jsx'));
const AuthPage = React.lazy(() => import('./routes/authPage/authPage.jsx'));
const SearchPage = React.lazy(() => import('./routes/searchPage/searchPage.jsx'));
const ProfilePage = React.lazy(() => import('./routes/profilePage/profilePage.jsx'));

const queryClient = new QueryClient()


const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;
const routerProps = import.meta.env.PROD ? {} : { basename: import.meta.env.BASE_URL };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router {...routerProps}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/pin/:id" element={<PostPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:userName" element={<ProfilePage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
      </Routes>
      </Router>
    </QueryClientProvider>
  </StrictMode>
)
