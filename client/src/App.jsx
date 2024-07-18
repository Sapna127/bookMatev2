import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import SellPage from "./Pages/SellPage";
import BuyPage from "./Pages/BuyPage";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
// import Profile from "./Pages/Profile";
// import ChatPage from "./Pages/ChatPage";
import AllBooks from "./Pages/AllBooks";

function App() {
  return (
    <Router>
      <div className="bg-yellow-400 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<SellPage/>}/>
          <Route path="/buy" element={<BuyPage/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          {/* <Route path="/profile" element={<Profile/>}/> */}
          {/* <Route path="/chat" element={<ChatPage/>}/> */}
          <Route path="/allbooks" element={<AllBooks/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
