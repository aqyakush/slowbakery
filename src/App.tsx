import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import { TokenProvider } from './pages/Authentication/TokenContext';
import Protected from './pages/Protected/protected';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import styled from 'styled-components';
import Home from './pages/Home';
import FAQ from './pages/Faq';
import Subscription from './pages/Subscription';
import OurStory from './pages/OurStory';
import Preorder from './pages/Preorder';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex-grow: 1;
`

const App: React.FC = () => {
  return (
    <Router>
      <TokenProvider>
        <AppWrapper>
          <Navigation />
          <Main>
            <Routes>
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/protected" element={<Protected/> } />
              <Route path="*" element={<Navigate to="/not-protected" />} />
              <Route path="/preorder" element={<Preorder />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Main>
          <Footer />
      </AppWrapper>
    </TokenProvider>
    </Router>
    

  );
};

export default App;