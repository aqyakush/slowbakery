import React from 'react';
import { BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import styled from 'styled-components';
import Home from './pages/Home';
import FAQ from './pages/Faq';
import Subscription from './pages/Subscription';
import OurStory from './pages/OurStory';
import Preorder from './pages/Preorder';
import CreateOrder from './pages/CreateOrder';
import NotFound from './components/NotFound';

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
    <HashRouter>
        <AppWrapper>
          <Navigation />
          <Main>
            <Routes>
              <Route path="/slowbakery/" element={<Home />} />
              <Route path="/slowbakery/preorder" element={<Preorder />} />
              <Route path="/slowbakery/preorder/create-order" element={<CreateOrder />} />
              <Route path="/slowbakery/subscription" element={<Subscription />} />
              <Route path="/slowbakery/faq" element={<FAQ />} />
              <Route path="/slowbakery/our-story" element={<OurStory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Main>
          <Footer />
      </AppWrapper>
    </HashRouter>
    

  );
};

export default App;