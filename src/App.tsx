import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import styled from 'styled-components';
import Home from './pages/Home';
import Subscription from './pages/Subscription';
import OurStory from './pages/OurStory';
import Preorder from './pages/Preorder';
import ShoppingCard from './pages/ShoppingCard';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
`

const Main = styled.main`
  flex-grow: 1;
`

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ShoppingCartProvider>
        <Router>
            <AppWrapper>
              <Navigation />
              <Main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/preorder" element={<Preorder />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="*" element={<Home />} />
                  <Route path="/shopping-cart" element={<ShoppingCard />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Main>
              <Footer />
          </AppWrapper>
        </Router>
      </ShoppingCartProvider>
    </ThemeProvider>
  );
};

export default App;