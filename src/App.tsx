import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import styled from 'styled-components';
import Home from './pages/Home';
import FAQ from './pages/Faq';
import Subscription from './pages/Subscription';
import OurStory from './pages/OurStory';
import Preorder from './pages/Preorder';
import CreateOrder from './pages/CreateOrder';

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
        <AppWrapper>
          <Navigation />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/preorder" element={<Preorder />} />
              <Route path="/preorder/create-order" element={<CreateOrder />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/our-story" element={<OurStory />} />
              
            </Routes>
          </Main>
          <Footer />
      </AppWrapper>
    </Router>
    

  );
};

export default App;