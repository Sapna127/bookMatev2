import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import SellPage from './Pages/SellPage';
import BuyPage from './Pages/BuyPage';
import AllBooks from './Pages/AllBooks';
import Modal from './components/Modal';
import Signin from './components/Signin';
import Signup from './components/Signup';
// import { UserProvider } from './contexts/UserContext';
import ChatPage from './Pages/ChatPage';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignin, setIsSignin] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const handleSignin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
    setIsModalOpen(false);
  };

  const handleSignout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsModalOpen(false);
  };

  const switchToSignup = () => {
    setIsSignin(false);
  };

  const switchToSignin = () => {
    setIsSignin(true);
  };

  return (
    // <UserProvider>
      <Router>
        <div className="bg-yellow-400 min-h-screen">
          <Navbar onSignout={handleSignout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/allbooks" element={<AllBooks />} />
            <Route path="/chat" element={<ChatPage/>}/>
          </Routes>
          <Footer />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => {}}>
          {isSignin ? (
            <Signin onSignin={handleSignin} switchToSignup={switchToSignup} />
          ) : (
            <Signup switchToSignin={switchToSignin} />
          )}
        </Modal>
      </Router>
    // </UserProvider>
  );
}

export default App;
